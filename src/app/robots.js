export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://inertiafrictionrc.vercel.app/sitemap.xml",
  };
}
