"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const socket_io_1 = require("socket.io");
const router_1 = require("./router");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
exports.io = new socket_io_1.Server(server);
mongoose_1.default.connect(process.env.MONGODB_URI)
    .then(() => {
    const port = 3001;
    exports.io.on('connect', () => { console.log('alguem se conectou ao server'); });
    /* Basicamente isso aqui é para resolver o erro de "CORS" no frontend, isso vai dar permissões em algumas coisas que acessarem essa API */
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*'); /*Isso aqui diz que essa URL tem permissão para acessar a API.Se for uma API publica coloca o asterisco que ai qualquer frontend pode acessar ela.*/
        res.setHeader('Access-Control-Allow-Methods', '*'); /* Esse aqui indica quais métodos são permitidos nessa API "GET,POST,PATCH..." o asterisco é para permitir todos.*/
        res.setHeader('Access-Control-Allow-Headers', '*');
        /*Requests que não terminam com uma "res.send" ou "req.send" elas precisam ter esse "next" no final para o código continuar seneão a request nunca vai sair aqui de dentro*/
        next();
    });
    // Isso aqui é basicamente uma rota para o node mostrar arquivos estáticos da pasta de "uploads" browser
    // caso alguem acesse "uploads/nomeImagem" e o nome dessa imagem estiver na pasta "uploads" ela vai ser acesasda no browser
    // Isso vai ser preciso para poder pegar as imagens no frontend.
    app.use('/uploads', express_1.default.static('../uploads'));
    // Serve para pegar qualquer requisição e transformar para json. e tem que vir antes do arquivo de rotas.
    app.use(express_1.default.json());
    app.use(router_1.router);
    server.listen(3001, () => {
        console.log('Server is runnig on Atlas MongoDBs');
    });
})
    .catch((error) => console.log(error));
