import figlet from 'figlet';

const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);
    const body = figlet.textSync('Selly und Alex <3');

    if (req.method === 'GET') {
      if (url.pathname === '/')
        return new Response(Bun.file(import.meta.dir + '/index.html'));
      if (url.pathname === '/bun') return new Response(body);
    }

    if (req.method === 'POST') {
      if (url.pathname === '/api') {
        for await (const chunk of req.body!) {
          const test = new TextDecoder().decode(new Uint8Array(chunk));
          console.log(new TextDecoder().decode(new Uint8Array(chunk)));
          return new Response(figlet.textSync(test));
        }
      }
    }

    return new Response(`404!`);
  },
});

console.log(`Listening on http://localhost:${server.port} ...`);
