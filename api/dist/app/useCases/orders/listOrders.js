"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listOrders = void 0;
const Order_1 = require("../../models/Order");
function listOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orders = yield Order_1.Order.find()
                //Esse sort vai ordenar a resposta de acordo com o que for passado dentro das chaves
                .sort({ createdAt: 1 }) // Esse 1 é como se fosse um "CRESCENT" e 1 é o contrário
                //O populate serve para invés de só mostrar o ID do produto, mostrar todos os dados da tabela "Product" referente a esse produto
                //Ja que a collection "order" tem uma relacionamento com a collection "Product", isso é possível.
                .populate('products.product');
            res.json(orders);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error!' });
        }
    });
}
exports.listOrders = listOrders;
