export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://inertiafrictionrc-gamma.vercel.app/sitemap.xml",
  };
}
