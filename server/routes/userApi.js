import express from "express";
import User from "../models/User.js";
import expressValidator from "express-validator";
import bcrypt from "bcryptjs";

const router = express.Router();
const { check, validationResult } = expressValidator;

router.get("/", (req, res) => {
  res.send("from the user api");
});


//checks for incoming request data is according to the requirements  
const sanitizeInput = (next) => {
  return [
    check("name", "name is required").notEmpty(),
    check("password", "password must be atleast 8 characters").isLength({
      min: 8,
    }),
    check("email", "Email is not valid").isEmail(),
  ];
};


//Router to create new Users
router.post("/", sanitizeInput(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);  //400 bad error request
  }
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) 
        return res.status(409).send("User already Exists");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt)
    const user = new User({...req.body, password:hashedPassword });
    await user.save();
    res.status(201).json({ message: "Successfully updated" });
  } 
  catch (error) {
    res.status(500).send("Server Error");
  }
});

export default router;
