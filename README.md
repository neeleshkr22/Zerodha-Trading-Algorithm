# 🏦 Zerodha Trading Algorithm (Limit Order Matching System)

![TypeScript](https://img.shields.io/badge/Built%20with-TypeScript-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Backend-Express.js-000000?logo=express&logoColor=white)
![Body-Parser](https://img.shields.io/badge/Middleware-body--parser-yellowgreen)
![Jest](https://img.shields.io/badge/Tested%20with-Jest-C21325?logo=jest&logoColor=white)
![Supertest](https://img.shields.io/badge/API%20Testing-Supertest-ff69b4)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)
![Made with ❤️](https://img.shields.io/badge/Made%20with-%E2%9D%A4-red)

---

This project is a simplified backend trading engine (inspired by Zerodha) that supports placing **limit orders**, **maintaining user balances**, and **matching buy/sell orders**. It simulates an order book mechanism, tracks balances, and exposes basic APIs to interact with.

---

## 📊 Architecture Diagram

> ![Architecture Diagram](/excalidraw/Part1.png)

>ORDER Book
> ![Architecture Diagram](/excalidraw/Part2.png)




---

## ⚙️ Features

- ✅ Place limit **buy/sell orders** (`/order`)
- ✅ **Auto-matching engine** for order execution
- ✅ Maintain and update **user balances**
- ✅ Get current **order book depth** (`/depth`)
- ✅ View **individual user balances** (`/balance/:userId`)
- 🚧 Upcoming: Market Quote Endpoint (`/quote`)

---

## 🧠 System Logic

### 📘 Data Structures

#### `User`
```ts
interface User {
  id: string;
  balances: {
    [ticker: string]: number;
  };
}
```

#### `Order`
```ts
interface Order {
  userId: string;
  price: number;
  quantity: number;
}
```

---

### 📚 How It Works

#### ➕ Placing an Order (`POST /order`)

- Takes: `side` ("bid" or "ask"), `price`, `quantity`, `userId`
- Tries to **fill the order** against opposite side of the book:
  - `bid` (buy) tries to fill with `asks` (sell) having **lower or equal price**
  - `ask` (sell) tries to fill with `bids` (buy) having **higher or equal price**
- Any unfilled quantity is **added back to order book** (sorted)

#### 🧮 Matching Engine (`fillOrders()`)

- Iterates through order book in reverse (most favorable price first)
- **Partial fills** supported (reduces order quantity)
- **Updates balances** of users using `flipBalance()`:

```ts
function flipBalance(sellerId, buyerId, qty, price) {
  seller.GOOGLE -= qty;
  buyer.GOOGLE += qty;
  seller.USD += qty * price;
  buyer.USD -= qty * price;
}
```

#### 📈 Market Depth (`GET /depth`)

- Shows current visible order book with **price → type → quantity**
- Merges same-price orders

```json
{
  "depth": {
    "1345": { "type": "bid", "quantity": 5 },
    "1350": { "type": "ask", "quantity": 10 }
  }
}
```

#### 💼 Get User Balance (`GET /balance/:userId`)

Returns:
```json
{
  "balances": {
    "GOOGLE": 12,
    "USD": 48000
  }
}
```

---

## 🧪 Sample Users

```ts
const users: User[] = [
  {
    id: "1",
    balances: {
      "GOOGLE": 10,
      "USD": 50000
    }
  },
  {
    id: "2",
    balances: {
      "GOOGLE": 10,
      "USD": 50000
    }
  }
];
```

---

## 📡 API Endpoints

| Method | Endpoint            | Description                  |
|--------|---------------------|------------------------------|
| POST   | `/order`            | Place bid/ask order          |
| GET    | `/depth`            | View current order book      |
| GET    | `/balance/:userId`  | Get specific user balances   |
| GET    | `/quote`            | _Coming soon_                |

---

<!-- ## 🧩 TODOs / Improvements

- ✅ Fix correct order book sorting
- ⏳ Add support for multiple tickers
- ⏳ Add market order support
- ⏳ Add frontend visualization (React)
- ⏳ Implement `/quote` for top-of-book prices

--- -->

## 🚀 Setup

```bash
npm install
npm run dev
```

---

## 💬 Notes

This project is for educational/demo purposes only and not suitable for production financial applications. For production, real-world considerations like concurrency, validation, error handling, persistent database, and security must be implemented.

---

## 👨‍💻 Author

**Neelesh Kumar**

---
