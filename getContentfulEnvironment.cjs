module.exports = () => {
  return {
    spaceId: process.env.VITE_CONTENTFUL_SPACE_ID,
    accessToken: process.env.VITE_CONTENTFUL_ACCESS_TOKEN,
    environment: process.env.VITE_CONTENTFUL_ENVIRONMENT || 'master'
  };
}; 