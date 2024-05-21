import express from 'express'
import { OrderController } from './Orders.Controller'

const ordersRouter = express.Router()

ordersRouter.post('/', OrderController.addOrders)
ordersRouter.get('/', OrderController.getAllOrders)

export default ordersRouter
