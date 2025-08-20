// src/components/MetaTags.jsx
import { Helmet } from "react-helmet-async";

const MetaTags = ({ 
  title, 
  description, 
  caption, 
  body, 
  image, 
  slug 
}) => {
  const siteUrl = "https://voiceofafrica.co.uk";

  // Defaults
  const defaultTitle = "Voiceofafrica – News, Culture & Stories";
  const defaultDescription =
    "Latest African news, culture, and stories from around the world.";
  const defaultImage = `${siteUrl}/default-image.jpg`;

  // Prefer props > caption > auto-generated from body > fallback
  const metaTitle = title || defaultTitle;
  const metaDescription =
    description ||
    caption ||
    (body ? body.replace(/<[^>]+>/g, "").substring(0, 150) : null) ||
    defaultDescription;
  const metaImage = image || defaultImage;
  const metaSlug =
    slug || (typeof window !== "undefined" ? window.location.pathname.slice(1) : "");

  return (
    <Helmet>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />

      {/* Open Graph */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={`${siteUrl}/${metaSlug}`} />
      <meta property="og:site_name" content="Voiceofafrica" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:site" content="@africanl" />
    </Helmet>
  );
};

export default MetaTags;

