import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

export default function SEO({
  title,
  description,
  image,
  url,
  schema,
  additionalSchemas = [],
  openGraph = {},
  twitter = {},
}) {
  const allSchemas = [schema, ...additionalSchemas].filter(Boolean);

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>

      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      

      {/* Open Graph */}
      <meta property="og:type" content={openGraph.type || "website"} />
      <meta property="og:title" content={openGraph.title || title} />
      <meta property="og:description" content={openGraph.description || description} />
      <meta property="og:url" content={openGraph.url || url} />
      <meta property="og:image" content={openGraph.image || image} />
      <meta property="og:site_name" content={openGraph.site_name} />

      {/* Twitter */}
      <meta name="twitter:card" content={twitter.card || "summary_large_image"} />
      <meta name="twitter:title" content={twitter.title || title} />
      <meta name="twitter:description" content={twitter.description || description} />
      <meta name="twitter:image" content={twitter.image || image} />
      <meta name="twitter:site" content={twitter.site} />

      {allSchemas.map((item, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
}

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  schema: PropTypes.object,
  additionalSchemas: PropTypes.array,
  openGraph: PropTypes.object,
  twitter: PropTypes.object,
};

SEO.defaultProps = {
  title: "",
  description: "",
  image: "",
  url: "",
  schema: null,
  additionalSchemas: [],
  openGraph: {},
  twitter: {},
};