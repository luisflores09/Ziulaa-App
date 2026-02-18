export const environment = {
  production: false,
  api: {
    // If your API is on another domain, set baseUrl (example: 'https://xxxx.execute-api.us-east-1.amazonaws.com')
    // If you route /api/* via CloudFront to API Gateway, leave baseUrl empty and keep searchPath as '/api/search'.
    baseUrl: '',
    searchPath: '/api/search',
  },
};
