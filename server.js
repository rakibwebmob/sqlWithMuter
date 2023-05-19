const express = require("express")
const cors = require("cors")
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const indexRouter = require("./src/routes/index").routes

app.use("/api", indexRouter)
  
app.get("/", (req, res) => {
    res.json({ message: "Welcome to application." });
});

app.use(function (req, res, next) {
    res.status(404).json({
        message: "No such route exists"
    });
});

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
})