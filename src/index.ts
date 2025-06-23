import express from "express"
import bodyParser from "body-parser"

export const app = express();

app.use(bodyParser({}));

interface Balances {
    [key: string]: number;
}

interface User {
    id: string;
    balances: Balances;
}

interface Order {
    userId: string;
    price: number;
    quantity: number;
}

export const TICKER = "GOOGLE";

const users: User[] = [{
    id: '1',
    balances: {
        "Google": 10,
        "USD": 50000
    }
}, {
    id: "2",
    balances: {
        "Google": 10,
        "USD": 50000
    }
}];

const bids: Order[] = [];
const asks: Order[] = [];


//place an order
app.post('/order',async(req:any,res:any)=>{
    const side : string = req.body.side;
    const price: number = req.body.price;
    const quantity : number = req.body.quantity;
    const userId : string = req.body.userId;

    const remainingQty = fillOrders(side, price, quantity,userId);

    if(remainingQty === 0){
        res.json({filledQuantity: quantity});
        return;
    }
    if(side === "bid"){
        bids.push({
            userId,
            price,
            quantity:  remainingQty,
        });
        bids.sort((a,b)=> a.price < b.price ? -1 : 1);
    }else{
        asks.push({
            userId,
            price,
            quantity: remainingQty
        })
        asks.sort((a,b)=> a.price < b.price ? 1 : -1);
    }
    res.json({
        filledQuantity : quantity -  remainingQty
    })
})

app.get('/depth', async(req:any, res:any)=>{
    const depth : {
        [price: string]:{
            type: "bid" | "asks",
            quantity : number,
        }
    } = {};
    for(let i = 0; i<bids.length;i++){
        if(!depth[bids[i].price]){
            depth[bids[i].price] = {
                quantity: bids[i].quantity,
                type: "bid"
            };
        }else{
            depth[bids[i].price].quantity += bids[i].quantity;
        }
    }
    for (let i = 0; i < asks.length; i++) {
    if (!depth[asks[i].price]) {
      depth[asks[i].price] = {
        quantity: asks[i].quantity,
        type: "asks"
      }
    } else {
      depth[asks[i].price].quantity += asks[i].quantity;
    }
  }
  res.json({
    depth
  })
})

app.get('/balance/:userId', async (req:any,res:any)=>{
    const userId = req.params.userId;
    const user  = users.find(x => x.id == userId);

})



function fillOrders(side: string, price: number, quantity:number, userId: string):number{
 return price;
}
