exports.handler = async (event) => {
  const clientId = process.env.OAUTH_CLIENT_ID;
  const siteUrl = process.env.URL || `https://${event.headers.host}`;
  const redirectUri = `${siteUrl}/callback`;

  if (!clientId) {
    return { statusCode: 500, body: 'OAUTH_CLIENT_ID manquant.' };
  }

  const state = Math.random().toString(36).slice(2);
  const authorizeUrl = new URL('https://github.com/login/oauth/authorize');
  authorizeUrl.searchParams.set('client_id', clientId);
  authorizeUrl.searchParams.set('redirect_uri', redirectUri);
  authorizeUrl.searchParams.set('scope', 'repo,user');
  authorizeUrl.searchParams.set('state', state);

  return {
    statusCode: 302,
    headers: { Location: authorizeUrl.toString() },
    body: '',
  };
};
