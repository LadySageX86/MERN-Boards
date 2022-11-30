const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(require("./routes/post"));
app.use(require("./routes/account"));
app.use(express.static("images"));

const dbo = require("./db/conn");

app.listen(port, () => {
    dbo.connectToServer((err) => {
        if (err) console.error(err);
    });
    console.log(`SERVER RUNNING ON PORT ${port}`);
});
