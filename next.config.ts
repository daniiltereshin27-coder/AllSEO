import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  experimental: {
    optimizePackageImports: ["gsap"],
  },
  async headers() {
    const securityHeaders = [
      {
        key: "Strict-Transport-Security",
        value: "max-age=31536000; includeSubDomains; preload",
      },
      {
        key: "X-Content-Type-Options",
        value: "nosniff",
      },
      {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
      },
      {
        key: "Permissions-Policy",
        value:
          "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
      },
      {
        key: "Content-Security-Policy",
        value: [
          "default-src 'self'",
          "base-uri 'self'",
          "form-action 'self'",
          [
            "frame-ancestors 'self'",
            "https://seoallerhand.ru",
            "https://www.seoallerhand.ru",
            "https://metrika.yandex.ru",
            "https://*.metrika.yandex.ru",
            "https://metrika.yandex.by",
            "https://*.metrika.yandex.by",
            "https://metrica.yandex.com",
            "https://*.metrica.yandex.com",
            "https://metrica.yandex.com.tr",
            "https://*.metrica.yandex.com.tr",
            "http://webvisor.com",
            "https://webvisor.com",
            "http://*.webvisor.com",
            "https://*.webvisor.com",
          ].join(" "),
          "object-src 'none'",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://mc.yandex.ru https://mc.yandex.com https://yastatic.net",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data: blob: https://mc.yandex.ru https://mc.yandex.com https://*.yandex.ru https://*.yandex.com https://*.yandex.net",
          "font-src 'self' data:",
          "connect-src 'self' https://mc.yandex.ru https://mc.yandex.com https://*.yandex.ru https://*.yandex.com https://*.yandex.net https://mc.webvisor.org",
          "frame-src 'self' https://mc.yandex.ru https://mc.yandex.com https://*.yandex.ru https://*.yandex.com",
          "child-src 'self' https://mc.yandex.ru https://mc.yandex.com https://*.yandex.ru https://*.yandex.com",
          "worker-src 'self' blob:",
          "upgrade-insecure-requests",
        ].join("; "),
      },
    ];

    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
