import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import productRouter from './app/modules/products/Products.Routes'
import ordersRouter from './app/modules/orders/Orders.Routes'

const app: Application = express()

app.use(express.json())
app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use('/api/products', productRouter)

app.use('/api/orders', ordersRouter)

app.use((req: Request, res: Response, next: Function) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
  next();
});

export default app
