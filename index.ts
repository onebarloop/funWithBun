const server = Bun.serve({
  port: 3000,
  fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === '/')
      return new Response(Bun.file(import.meta.dir + '/index.html'));
    if (url.pathname === '/blog') return new Response('Blog!');

    return new Response(`404!`);
  },
});

console.log(`Listening on http://localhost:${server.port} ...`);
