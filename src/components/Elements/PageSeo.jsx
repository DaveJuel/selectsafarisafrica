// src/components/Elements/PageSeo.jsx
import SEO from "./SEO";

const SITE = "https://www.selectsafarisafrica.com";
const DEFAULT_IMAGE = `${SITE}/bg_image1.jpg`;

export default function PageSeo({
  path,                      // e.g. "/about-us/" (leading and trailing slash)
  title,
  description,
  image = DEFAULT_IMAGE,
  schema,
  additionalSchemas,
}) {
  const url = `${SITE}${path}`;
  const optional = {
    ...(schema && { schema }),
    ...(additionalSchemas && { additionalSchemas }),
  };

  return (
    <SEO
      title={title}
      description={description}
      image={image}
      url={url}
      openGraph={{
        type: "website",
        title,
        description,
        image,
        url,
        site_name: "Select Safaris Africa",
      }}
      twitter={{
        card: "summary_large_image",
        site: "@SelectSafarisAfrica",
        title,
        description,
        image,
      }}
      {...optional}
    />
  );
}