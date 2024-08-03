import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { expressjwt as jwt } from "express-jwt";
import JWT from "jsonwebtoken";
import Signuser from "./model.js";
import Saleentry from "./productmodel.js";

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

mongoose.connect("mongodb+srv://vishnuvardhan:vishnuvardhan@cluster0.xh5f3t4.mongodb.net/?retryWrites=true&w=majority")
  .then(() => console.log("DB connected.."))
  .catch(err => console.log(err));

// Middleware for authentication
const requireSignIn = jwt({
  secret: "wnne133de4",
  algorithms: ["HS256"],
  requestProperty: 'auth'
});

app.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    let exist = await Signuser.findOne({ email });
    if (exist) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }
    let newUser = new Signuser({ firstname, lastname, email, password });
    await newUser.save();
    res.status(200).json({ success: true, message: "Registered successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await Signuser.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).send({ success: false, message: "Invalid credentials" });
    }

    const token = JWT.sign({ _id: user._id }, "wnne133de4", { expiresIn: "7d" });
    res.status(200).send({
      success: true,
      message: "Login successful",
      user: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
});

app.post("/addsales", requireSignIn, async (req, res) => {
  try {
    const { product, quantity, amount } = req.body;
    const newProduct = new Saleentry({
      product,
      quantity,
      amount,
      entryBy: req.auth._id,
    });
    await newProduct.save();
    res.status(200).json({ success: true, message: "Sale entry added successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.get("/addsales", requireSignIn, async (req, res) => {
  try {
    const salesData = await Saleentry.find({ entryBy: req.auth._id });
    res.json(salesData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(4000, () => {
  console.log("Server started");
});
