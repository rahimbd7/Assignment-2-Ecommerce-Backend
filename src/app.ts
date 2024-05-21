import express, { Application, Request, Response } from "express";
import cors from "cors";
import productRouter from "./app/modules/products/Products.Routes";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});


app.use('/api/products', productRouter);


export default app;
