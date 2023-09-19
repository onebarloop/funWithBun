import figlet from 'figlet';

const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);

    if (req.method === 'GET') {
      if (url.pathname === '/')
        return new Response(Bun.file(import.meta.dir + '/index.html'));
    }

    if (req.method === 'POST') {
      if (url.pathname === '/ascii') {
        if (req.body) {
          const body = await Bun.readableStreamToText(req.body);
          const ascii = figlet.textSync(body);
          return new Response(ascii);
        }
      }
    }
    return new Response(`404!`);
  },
});

console.log(`Listening on http://localhost:${server.port} ...`);
