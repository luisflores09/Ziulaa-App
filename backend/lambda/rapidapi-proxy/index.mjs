function corsHeaders() {
  const origin = process.env.CORS_ALLOW_ORIGIN || '*';
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Allow-Methods': 'GET,OPTIONS',
    'Access-Control-Max-Age': '86400',
    'Content-Type': 'application/json',
  };
}

function getMethod(event) {
  // REST API: event.httpMethod
  if (event?.httpMethod) return event.httpMethod;

  // HTTP API v2: event.requestContext.http.method
  return event?.requestContext?.http?.method;
}

export const handler = async (event) => {
  const method = getMethod(event);

  if (method === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: corsHeaders(),
      body: '',
    };
  }

  const q = event?.queryStringParameters?.q;
  if (!q || !q.trim()) {
    return {
      statusCode: 400,
      headers: corsHeaders(),
      body: JSON.stringify({ error: "Missing required query parameter 'q'." }),
    };
  }

  const searchUrl = process.env.RAPIDAPI_SEARCH_URL;
  if (!searchUrl) {
    return {
      statusCode: 500,
      headers: corsHeaders(),
      body: JSON.stringify({ error: 'RAPIDAPI_SEARCH_URL is not configured.' }),
    };
  }

  // NOTE: For a $0-friendly setup, store these as Lambda environment variables.
  // Never put RapidAPI keys in the Angular app.
  const key = process.env.RAPIDAPI_KEY || '';
  const host = process.env.RAPIDAPI_HOST || '';
  if (!key) {
    return {
      statusCode: 500,
      headers: corsHeaders(),
      body: JSON.stringify({ error: 'RapidAPI key is not configured.' }),
    };
  }

  const url = new URL(searchUrl);
  url.searchParams.set('q', q);

  const headers = {
    'X-RapidAPI-Key': key,
  };

  // Many RapidAPI providers require this header.
  if (host) {
    headers['X-RapidAPI-Host'] = host;
  }

  const upstreamResp = await fetch(url.toString(), {
    method: 'GET',
    headers,
  });

  const bodyText = await upstreamResp.text();

  return {
    statusCode: upstreamResp.status,
    headers: corsHeaders(),
    body: bodyText,
  };
};
