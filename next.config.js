const port = process.env.PORT || 3000;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    serverActions: true,
  },
  images: {
    minimumCacheTTL: 60,
    remotePatterns: [{ protocol: "https", hostname: "image.tmdb.org" }],
  },
  env: {
    page:
      process.env.NODE_ENV === "development"
        ? `http://localhost:${port}`
        : process.env.PAGE,
    firebaseAdmin: {
      projectId: process.env.FIREBASE_SA_PROJECT_ID,

      privateKey: process.env.FIREBASE_PRIVATE_SA_KEY
        ? process.env.FIREBASE_PRIVATE_SA_KEY.replace(/\\n/gm, "\n")
        : undefined,
      clientEmail: process.env.FIREBASE_SA_CLIENT_EMAIL,
    },
    public: {
      firebase: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID,
      },
      apiBase: "/api",
    },
  },
};

module.exports = nextConfig;
