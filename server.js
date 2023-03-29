const express = require('express');
const next = require('next');
const nextConnect = require('next-connect');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Custom route for skills
  server.get('/skills/:skill', (req, res) => {
    const capitalizedSkill = capitalize(req.params.skill);
    const queryParams = { skill: capitalizedSkill };
    app.render(req, res, `/skills/${capitalizedSkill}`, queryParams);
  });

  server.use(
    nextConnect({
      onError(error, req, res) {
        res.status(501).json({ error: `Sorry something happened! ${error.message}` });
      },
      onNoMatch(req, res) {
        handle(req, res);
      },
    }).use((req, res) => {
      handle(req, res);
    }),
  );

  const PORT = process.env.PORT || 3000;

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
