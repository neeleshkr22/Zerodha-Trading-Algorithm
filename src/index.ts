import express from "express"
import bodyParser from "body-parser"

export const app = express();

app.use(bodyParser({}));

interface Balances{
    [key: string]: number;
}

interface User{
    id: string;
    balance: Balances;
}

interface Order{
    userId: string;
    price: number;
    quantity : number;
}

export const TICKER = "GOOGLE";


