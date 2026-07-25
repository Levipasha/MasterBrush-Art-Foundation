import { useEffect } from 'react';

export default function SEO({ title, description, keywords, ogImage, ogType = 'website', canonicalUrl }) {
  useEffect(() => {
    // 1. Title
    const formattedTitle = title 
      ? `${title} | MasterBrush Art Foundation` 
      : 'MasterBrush Art Foundation - Empowering Specially-Abled Artists';
    document.title = formattedTitle;

    // 2. Meta Description
    let descMeta = document.querySelector('meta[name="description"]');
    if (!descMeta) {
      descMeta = document.createElement('meta');
      descMeta.name = 'description';
      document.head.appendChild(descMeta);
    }
    descMeta.content = description || 'An art initiative dedicated to promoting creativity and providing art education for all — including specially-abled artists.';

    // 3. Meta Keywords
    let keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (!keywordsMeta) {
      keywordsMeta = document.createElement('meta');
      keywordsMeta.name = 'keywords';
      document.head.appendChild(keywordsMeta);
    }
    keywordsMeta.content = keywords || 'art NGO, specially-abled artists, art foundation, art education, charity painting, Hyderabad, India';

    // 4. Open Graph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.content = formattedTitle;

    // 5. Open Graph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.content = description || 'An art initiative dedicated to promoting creativity and providing art education for all — including specially-abled artists.';

    // 6. Open Graph Image
    let ogImgMeta = document.querySelector('meta[property="og:image"]');
    if (!ogImgMeta) {
      ogImgMeta = document.createElement('meta');
      ogImgMeta.setAttribute('property', 'og:image');
      document.head.appendChild(ogImgMeta);
    }
    // Make absolute URL if relative path is passed
    const imgPath = ogImage || '/about_foundation.jpg';
    ogImgMeta.content = imgPath.startsWith('http') ? imgPath : window.location.origin + imgPath;

    // 7. Open Graph URL
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.content = canonicalUrl || window.location.href;

    // 8. Open Graph Type
    let ogTypeMeta = document.querySelector('meta[property="og:type"]');
    if (!ogTypeMeta) {
      ogTypeMeta = document.createElement('meta');
      ogTypeMeta.setAttribute('property', 'og:type');
      document.head.appendChild(ogTypeMeta);
    }
    ogTypeMeta.content = ogType;

  }, [title, description, keywords, ogImage, ogType, canonicalUrl]);

  return null;
}
