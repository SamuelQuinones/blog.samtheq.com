export default function ensureTrailingSlash(url: string | URL) {
  return url.toString().replace(/\/$/, "") + "/";
}
