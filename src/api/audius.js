const isLocal =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

const redirectUri = isLocal
  ? "http://localhost:5173/callback.html"
  : "https://afagsalah.github.io/-Jammming/callback.html";

const audius = window.audiusSdk({
  appName: "Jammming",
  apiKey: "064d4d8907d82d99c40e1e7f621cd7ed41fe157e",
  redirectUri: redirectUri,
});

export default audius;
