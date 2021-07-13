const mongoose = require("mongoose");
const express = require("express");
const app = express();
app.use(express.json());

const PORT = 3000;

//create connection ..
const DB = "mongodb+srv://Neha:nehamongo@123@cluster0.rnv5z.mongodb.net/Login-Sign-UP?retryWrites=true&w=majority"

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("database connected..");
}).catch((err) => console.log(err, "no connection.."));

//create schema ...

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true
    },
    password: {
        type: Number,
        required: true
    }
})

//create model....
const LoginSignUp_collections = new mongoose.model("mycollections", UserSchema);



//create API for get all data..
app.post("/signup", (req, res) => {
    const getDocument = async () => {
        try {
            const result = await LoginSignUp_collections.find({});
            if (result.length > 0) {
                var a = true
                for (x of result) {
                    if (x.email == req.body.email && x.password == req.body.password) {
                        a = false
                        console.log("You are Already existe there...")
                        res.send("You are Already existe there...")
                    }
                }
                if (a == true) {
                    const createDocument = async () => {
                        try {
                            const reactMycollection = new LoginSignUp_collections({
                                username: req.body.username,
                                email: req.body.email,
                                password: req.body.password
                            })
                            const result = await reactMycollection.save()
                            console.log("Sign-Up successfully..")
                            res.send("Sign-Up successfully..")
                        } catch (err) { console.log(err) }
                    }
                    createDocument()
                }
            }
            else {
                const createDocument = async () => {
                    try {
                        const reactMycollection = new LoginSignUp_collections({
                            username: req.body.username,
                            email: req.body.email,
                            password: req.body.password
                        })
                        const result = await reactMycollection.save()
                        console.log("Sign-Up successfully..")
                        res.send("Sign-Up successfully..")
                    } catch (err) { console.log(err) }
                }
                createDocument()
            }
        } catch (err) { console.log(err) }
    }
    getDocument();
})

//create API for login ...
app.post("/login", (req, res) => {
    const getDocuments = async () => {
        try {
            const result = await LoginSignUp_collections.find({})
            var a = true
            for (x of result) {
                if (x.email == req.body.email && x.password == req.body.password) {
                    a = false
                    console.log("Your Login Successfully ...")
                    res.send("Your Login Successfully ...")
                }
            }
            if (a === true) {
                console.log("Invalid User ...")
                res.status(400).send("Invalid User")
            }
        } catch (err) {
            console.log(err)
        }
    }
    getDocuments()
})


app.listen(PORT, () => {
    console.log(`server is running on port on ${PORT}`)
})