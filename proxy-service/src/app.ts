import express, { NextFunction } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use((req, _res, next:NextFunction) => {
    console.log(`➡️  Proxying request: ${req.method} ${req.originalUrl}`);
    next();
  });

app.use('/customer', createProxyMiddleware({
    target: process.env.CUSTOMER_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/customer': '' },
}));

app.use('/transaction', createProxyMiddleware({
    target: process.env.TRANSACTION_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/customer': '' },
}));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
});
