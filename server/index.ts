import Server from "./appClass";
import DataBase from './sql/databaseClass';

const database = new DataBase();

const port = 7070;

const server = new Server(port);

server.runServer(() => {
    console.log(`Server ready at http://localhost:${server.getPort()}`);
})
