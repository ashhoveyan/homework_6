import express from 'express';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import postRoutes from "./routes/taskRoutes.js";


dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use('/tasks', postRoutes);

app.listen(process.env.PORT, () => {
    console.log(`server is running on ${process.env.PORT}`);
})

