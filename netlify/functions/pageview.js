// pageview.js
exports.handler = async (event, context) => {
  // Get the page name from query string
  const page = event.queryStringParameters?.page || "unknown";

  // Log it (viewable in Netlify dashboard)
  console.log(`PAGEVIEW: ${page} | Time: ${new Date().toISOString()}`);

  // Optional: you could add extra info here, like IP (for debugging only)
  // const ip = event.headers['x-forwarded-for'] || 'unknown';

  // Return 204 No Content (nothing sent to browser)
  return {
    statusCode: 204,
    body: "",
  };
};
