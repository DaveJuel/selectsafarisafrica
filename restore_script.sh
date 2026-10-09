
#!/usr/bin/env bash

set -euo pipefail

# Run from the root of your Git repository.
RECOVERY_DIR="$(mktemp -d)"
trap 'rm -rf "$RECOVERY_DIR"' EXIT

ASSET_LIST="$RECOVERY_DIR/assets.txt"
: > "$ASSET_LIST"

# Collect paths of assets that existed in any reachable commit.
while IFS= read -r commit; do
    git ls-tree -r --name-only -z "$commit" |
    while IFS= read -r -d '' path; do
    lower_path="$(printf '%s' "$path" | tr '[:upper:]' '[:lower:]')"
        case "$lower_path" in
            *.mp4|*.mov|*.avi|*.mkv|*.webm|\
            *.jpg|*.jpeg|*.png|*.gif|*.webp|*.bmp|*.tif|*.tiff|\
            *.svg|*.ico|*.avif|*.heic|\
            *.pdf|*.woff|*.woff2|*.ttf|*.otf|\
            *.mp3|*.wav|*.ogg|*.m4a|*.flac|\
            *.glb|*.gltf|*.obj|*.fbx|*.zip)
                printf '%s\0' "$path" >> "$ASSET_LIST"
                ;;
        esac
    done
done < <(git rev-list --all)

# Restore each unique historical asset path if it is absent.
git -c core.quotepath=false ls-files --deleted -z >/dev/null

python3 - "$ASSET_LIST" <<'PY'
import os
import subprocess
import sys

asset_list = sys.argv[1]

with open(asset_list, "rb") as f:
    paths = sorted(set(p for p in f.read().split(b"\0") if p))

restored = 0
skipped = 0

for raw_path in paths:
    path = os.fsdecode(raw_path)

    # Never overwrite an existing file.
    if os.path.lexists(path):
        skipped += 1
        continue

    # Find the most recent historical blob at this path.
    result = subprocess.run(
        ["git", "log", "--all", "--format=", "--name-only",
         "--diff-filter=ACDMRT", "--", path],
        stdout=subprocess.PIPE,
        stderr=subprocess.DEVNULL,
        check=True,
    )

    # Search historical commits for a version of this exact path.
    commits = subprocess.check_output(
        ["git", "rev-list", "--all", "--", path],
        text=True,
    ).splitlines()

    blob = None
    for commit in commits:
        entry = subprocess.run(
            ["git", "ls-tree", "-z", commit, "--", path],
            stdout=subprocess.PIPE,
            check=True,
        ).stdout
        if entry:
            metadata = entry.split(b"\t", 1)[0].split()
            if len(metadata) >= 3 and metadata[1] == b"blob":
                blob = metadata[2].decode()
                break

    if not blob:
        continue

    os.makedirs(os.path.dirname(path) or ".", exist_ok=True)
    content = subprocess.check_output(["git", "cat-file", "blob", blob])

    with open(path, "wb") as out:
        out.write(content)

    restored += 1
    print(f"Restored: {path}")

print(f"\nFinished. Restored: {restored}; skipped existing files: {skipped}")
PY
