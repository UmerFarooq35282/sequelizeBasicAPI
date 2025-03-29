import 'dotenv/config'
import app from "./app.js";
import {ConnectionToDB} from "./db/connection.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT,() => {
    console.log(`App is running on PORT :: ${PORT}`)
    ConnectionToDB();
})