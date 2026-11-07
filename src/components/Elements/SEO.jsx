// src/components/Seo.jsx
import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SITE = (process.env.REACT_APP_SITE_URL || "https://www.selectsafarisafrica.com").replace(/\/$/, "");
const DEFAULT_IMAGE = `${SITE}/og-default.jpg`; // 1200x630 in /public

export default function Seo({ title, description, image = DEFAULT_IMAGE, type = "website", canonicalPath, noindex = false, jsonLd }) {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();
  const raw = canonicalPath ?? pathname;
  const path = raw === "/" ? "/" : raw.replace(/\/+$/, "") + "/";
  const url = `${SITE}${path}`;

  return (
    <Helmet htmlAttributes={{ lang: i18n.language || "en" }}>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:site_name" content="Select Safaris Africa" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
}