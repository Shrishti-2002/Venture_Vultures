const router = require("express").Router();

router.post("/login", login);
router.post("/register", async(req,res,next)=>{
    try {
    const {name,username,email,password,city,state,pincode,linkedinID,description}=req.body;
    if (!name || !username || !email || !password  || !city || !state || !pincode || !linkedinID || !discription){
        return res.status(422).json({error:"error"})
    }
        const usernameCheck = await User.findOne({ username });
        if (usernameCheck)
          return res.json({ msg: "Username already used", status: false });
        const emailCheck = await User.findOne({ email });
        if (emailCheck)
          return res.json({ msg: "Email already used", status: false });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
          name,
          username,
          email,
          password: hashedPassword,
          city,
          state,
          pincode,
          linkedinID,
          description
        });
        delete user.password;
        return res.json({ status: true, user });
      } catch (ex) {
        next(ex);
      }
});
router.post("/login",async (req,res,next)=>{
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user)
          return res.json({ msg: "Incorrect Username or Password", status: false });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
          return res.json({ msg: "Incorrect Username or Password", status: false });
        delete user.password;
        return res.json({ status: true, user });
      } catch (ex) {
        next(ex);
      }
});
module.exports = router;