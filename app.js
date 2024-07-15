import express from 'express';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";


dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

app.listen(process.env.PORT, () => {
    console.log(`server is running on ${process.env.PORT}`);
})

