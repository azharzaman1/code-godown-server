export const allowedOrigins = [
  "http://localhost:3000",
  "https://code-godown.vercel.app",
  "https://codegodown.azharzaman.com",
  "https://codegodown-kamran.vercel.app",
];

export const corOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Origin Not Allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};
