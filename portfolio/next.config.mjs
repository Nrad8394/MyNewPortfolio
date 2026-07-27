/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: the site is served as plain files from cPanel/Apache.
  // There is no server here, so nothing in this app can be kept private --
  // every env var is compiled into the client bundle. See portfolio/.env.
  output: "export",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // The tree typechecks clean -- keep it that way rather than shipping type errors.
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
  // NOTE: `experimental.webpackBuildWorker`, `parallelServerCompiles` and
  // `parallelServerBuildTraces` were REMOVED deliberately. With them enabled,
  // roughly 2 in 3 cold builds failed nondeterministically during the export
  // step with "Cannot read properties of undefined (reading 'call')" or
  // "Cannot find module for page: /_document | /_error | /_not-found" --
  // a race between the parallel webpack workers, not a fault in the app code.
  // Reproduced on the original layout.tsx too, so it predates the SEO work.
  // Verified 4/4 clean cold builds after removing them. Do not re-add.
  //
  // Also no headers() here -- Next ignores it under `output: "export"`.
  // Security headers are set by Apache in public/.htaccess instead.
}

export default nextConfig
