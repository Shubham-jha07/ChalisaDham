import type { NextConfig } from 'next';
export default {
  output:'export',
  trailingSlash:true,
  images:{unoptimized:true},
  poweredByHeader:false,
  webpack(config) {
    // Keep one module identity when this Windows workstation uses a dependency junction.
    // Normal npm ci / Cloudflare builds retain Next.js defaults.
    if (process.env.CHALISADHAM_JUNCTION_BUILD === '1') {
      config.resolve.symlinks = false;
      config.resolveLoader.symlinks = false;
    }
    return config;
  },
} satisfies NextConfig;
