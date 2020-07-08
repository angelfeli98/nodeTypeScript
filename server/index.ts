import Server from "./appClass";

const port = 7070;

const server = new Server(port);

server.useServer();

server.runServer(() => {
    console.log(`Ready at http://localhost:${server.getPort()}`);
})
