require("dotenv").config()
import express, {Express, Request, Response} from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authentication_router from "./back-end/auth/main";
import {db_router} from "./back-end/db/main"
const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())

app.use(cors());


app.get("/",(req, res) => {
    return res.send("Hello world");
});

app.use(authentication_router)
app.use(db_router)

app.listen(3000, () => {
    console.log("server is now listening")
});