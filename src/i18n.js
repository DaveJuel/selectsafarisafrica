// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import enCommon from "./locales/en/common.json";
import enAdventures from "./locales/en/adventures.json";
import enAboutUs from "./locales/en/about_us.json";
import enBookingDetails from "./locales/en/booking_details.json";
import enBookingForm from "./locales/en/booking_form.json";
import enCancellation from "./locales/en/cancellation.json";
import enContactUs from "./locales/en/contact_us.json";
import enItineraries from "./locales/en/itineraries.json";
import enPrivacyPolicy from "./locales/en/privacy_policy.json";
import enTerms from "./locales/en/terms.json";

// Must match the folders remaining in public/locales/*
const SUPPORTED = ["en", "fr", "de", "ar", "es", "ja", "ko", "pt-br", "pt-pt", "ru", "tr", "zh"];
const LS_KEY = "i18nextLng";
const COOKIE_KEY = "i18next";

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: "en", // first render is always English, matching the snapshot
    fallbackLng: "en",
    ns: ["common", "adventures"],
    defaultNS: "common",
    resources: {
      en:
      {
        common: enCommon,
        adventures: enAdventures,
        about_us: enAboutUs,
        booking_details: enBookingDetails,
        booking_form: enBookingForm,
        cancellation: enCancellation,
        contact_us: enContactUs,
        itineraries: enItineraries,
        privacy_policy: enPrivacyPolicy,
        terms: enTerms
      }
    },
    partialBundledLanguages: true, // other languages still come from /locales via HTTP
    initImmediate: false, // synchronous init, no keys on first render
    react: { useSuspense: false },
    backend: { loadPath: "/locales/{{lng}}/{{ns}}.json" },
    interpolation: { escapeValue: false },
    debug: false,
  });

// --- Post-hydration language detection (replaces i18next-browser-languagedetector) ---
// Same precedence and storage keys as before: ?lng= > cookie > localStorage > navigator
const readCookie = (name) => {
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : null;
};
const readLS = () => {
  try { return localStorage.getItem(LS_KEY); } catch { return null; }
};

function detectLanguage() {
  const candidates = [
    new URLSearchParams(window.location.search).get("lng"),
    readCookie(COOKIE_KEY),
    readLS(),
    ...(navigator.languages || [navigator.language]),
  ];
  for (const c of candidates) {
    if (!c) continue;
    if (SUPPORTED.includes(c)) return c;
    const base = c.split("-")[0];
    if (SUPPORTED.includes(base)) return base;
  }
  return "en";
}

let persist = false; // don't overwrite the stored preference during init
i18n.on("languageChanged", (lng) => {
  if (!persist) return;
  try { localStorage.setItem(LS_KEY, lng); } catch { }
  document.cookie = `${COOKIE_KEY}=${lng};path=/;max-age=31536000;SameSite=Lax`;
});

export function applyUserLanguage() {
  const lng = detectLanguage();
  persist = true;
  if (lng !== i18n.language) i18n.changeLanguage(lng);
}

export default i18n;