// import express from 'express';
// import cookieParser from 'cookie-parser';
// import cors from 'cors';
// import connectDB from './configs/db.js';
// import 'dotenv/config';
// import userRouter from './routes/userRoute.js';
// import sellerRouter from './routes/sellerRoute.js';
// import connectCloudinary from './configs/cloudinary.js';
// import productRouter from './routes/productRoute.js';
// import cartRouter from './routes/cartRoute.js';
// import addressRouter from './routes/addressRoute.js';
// import orderRouter from './routes/orderRoute.js';
// import { stripeWebhooks } from './controllers/orderController.js';

// const app = express();
// const port = process.env.PORT || 4000;

// await connectDB();
// await connectCloudinary();

// // Allow multiple origins
// const allowedOrigins = ['http://localhost:5173']

// app.post('/stripe', express.raw({type: 'application/json'}), stripeWebhooks);

// // Midlleware configuration
// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({ origin: allowedOrigins, credentials: true }));

// app.get('/', (req, res) => res.send("API is Working"));
// app.use('/api/user', userRouter)
// app.use('/api/seller', sellerRouter)
// app.use('/api/product', productRouter)
// app.use('/api/cart', cartRouter)
// app.use('/api/address', addressRouter)
// app.use('/api/order', orderRouter)

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// })


import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from '../configs/db.js';
import connectCloudinary from '../configs/cloudinary.js';
import 'dotenv/config';

import userRouter from '../routes/userRoute.js';
import sellerRouter from '../routes/sellerRoute.js';
import productRouter from '../routes/productRoute.js';
import cartRouter from '../routes/cartRoute.js';
import addressRouter from '../routes/addressRoute.js';
import orderRouter from '../routes/orderRoute.js';
import { stripeWebhooks } from '../controllers/orderController.js';

const app = express();

/* ================= STRIPE WEBHOOK ================= */
// ⚠️ MUST be before express.json()
app.post(
    '/stripe',
    express.raw({ type: 'application/json' }),
    stripeWebhooks
);

/* ================= MIDDLEWARE ================= */
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://your-frontend.vercel.app'
    ],
    credentials: true
}));

/* ================= DB CONNECTION ================= */
let isConnected = false;

const connectOnce = async () => {
    if (isConnected) return;
    await connectDB();
    await connectCloudinary();
    isConnected = true;
};

app.use(async (req, res, next) => {
    await connectOnce();
    next();
});

/* ================= ROUTES ================= */

app.get("/", (req, res) => {
  res.status(200).send("API is Working on Vercel");
});

app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

/* ❌ NO app.listen() */
export default app;
