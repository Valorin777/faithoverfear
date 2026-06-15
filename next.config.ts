import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const securityHeaders = [
  // Запрещает встраивание сайта в чужие iframe (защита от кликджекинга)
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Запрещает браузеру угадывать тип файла (защита от MIME-sniffing атак)
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Не передаёт полный адрес страницы на сторонние сайты
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Принудительный HTTPS на год (защита от перехвата трафика)
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  // Отключает доступ к камере, микрофону и геолокации
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default withPayload(nextConfig);
