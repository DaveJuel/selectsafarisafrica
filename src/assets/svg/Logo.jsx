import * as React from "react";

function LogoComponent({scale = 1, logo = 'white'}) {
  const baseWidth = 147;
  const baseHeight = 90;
  const width = baseWidth * scale;
  const height = baseHeight * scale;
  const logoImg = 'sitting_lion.gif';
  return (
    <img
      src={`${process.env.PUBLIC_URL}/${logoImg}`}
      alt=""
      width={width}
      height={height}
      style={{ objectFit: "contain" }}
    />
  );
}

export default LogoComponent;
