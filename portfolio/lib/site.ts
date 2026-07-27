// Single source of truth for absolute URLs used in metadata, sitemap, robots
// and structured data. Override with NEXT_PUBLIC_SITE_URL when you move to a
// custom domain -- nothing else needs to change.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://karanjasoftwareengineer.great-site.net"
).replace(/\/$/, "");

export const SITE_NAME = "Karanja Benjamin";

export const AUTHOR = {
  name: "Karanja Benjamin",
  alternateName: "Benjamin Karanja Njoroge",
  jobTitle: "Software Engineer",
  email: "benjaminkaranja8393official@gmail.com",
  location: "Nairobi, Kenya",
  github: "https://github.com/Nrad8394",
  linkedin: "https://www.linkedin.com/in/benjamin-karanja-93852523b",
};

// The list of indexable routes lives in public/sitemap.xml, not here. If you add
// or rename a route, update that file and public/robots.txt by hand.
