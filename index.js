import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from 'morgan';
import userRouter from './routes/user.js'
import tourRouter from './routes/tour.js'

const app = express();

app.use(morgan("dev"));
app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use("/users", userRouter);
app.use("/tours", tourRouter);

const MONGO_URL = "mongodb+srv://toko:toko123@tokoonline.yjvabjz.mongodb.net/tour?retryWrites=true&w=majority"

const port = 5000;

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log("Connected MongoDB")
        app.listen(port, () => {
            console.log(`Server running on port ${port}`)
        })
    })
    .catch((error) => console.log(`${error} did not connected`))

app.get("/", (req, res) => {
    res.send("Hello Express");
});

// app.listen(port, () => {
//     console.log(`Server running on port ${port}`)
// })