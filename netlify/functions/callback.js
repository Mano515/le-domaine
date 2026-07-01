exports.handler = async (event) => {
  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;
  const code = event.queryStringParameters && event.queryStringParameters.code;

  if (!clientId || !clientSecret) {
    return { statusCode: 500, body: 'OAUTH_CLIENT_ID / OAUTH_CLIENT_SECRET manquants.' };
  }
  if (!code) {
    return { statusCode: 400, body: 'Code manquant.' };
  }

  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
    }),
  });

  const data = await tokenResponse.json();

  if (data.error || !data.access_token) {
    return {
      statusCode: 400,
      body: `Erreur d'authentification GitHub : ${data.error_description || data.error || 'inconnue'}`,
    };
  }

  const payload = JSON.stringify({ token: data.access_token, provider: 'github' });

  const html = `<!doctype html>
<html>
<body>
<script>
(function() {
  function receiveMessage(e) {
    window.opener.postMessage(
      'authorization:github:success:' + ${JSON.stringify(payload)},
      e.origin
    );
    window.removeEventListener('message', receiveMessage, false);
  }
  window.addEventListener('message', receiveMessage, false);
  window.opener.postMessage('authorizing:github', '*');
})();
</script>
</body>
</html>`;

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/html' },
    body: html,
  };
};
