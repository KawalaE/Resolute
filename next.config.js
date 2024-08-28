/** @type {import('next').NextConfig} */
const nextConfig = {
  //to fix the avatar loading issue
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "referrer-policy",
            value: "no-referrer",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
