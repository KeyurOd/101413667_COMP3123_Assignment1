const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require("./routes/user");
const employeeRoutes = require("./routes/employee");
const SERVER_PORT = 3000;

const DB_CONNECTION_STRING = "mongodb+srv://101413667:101413667@comp3123-assigment1.vwhbd.mongodb.net/?retryWrites=true&w=majority&appName=comp3123-assigment1"
mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB")
}).catch((err) => {
    console.log("Error: ", err)
})

const app = express();
app.use(express.json());


app.use("/api/v1/user", userRoutes);
app.use("/api/v1/emp", employeeRoutes)


app.route("/")
    .get((req, res) => {
        res.send("<h1>MogoDB + Mongoose Example</h1>")
    })

app.listen(SERVER_PORT, () =>{
    console.log(`Server running at http://localhost:${SERVER_PORT}/`)
})
