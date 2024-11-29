const server = Bun.serve({
    port: 3000,
    fetch(request) {
        const a = {
            privet1: "1234",
            privet2: 123,
            privet3: false,
        }
        return Response.json(a);
    },
});

console.log(`Listening on localhost:${server.port}`);