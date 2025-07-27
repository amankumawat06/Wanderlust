const User = require("../models/user.js");


module.exports.renderSignupForm = (req, res) => {
  res.render("./users/signup.ejs");
}

module.exports.signupFrom = async (req, res,next) => {
    try {
      let { username, email, password } = req.body;
      let newUser = new User({ username, email });
      let registerdUser = await User.register(newUser, password);
      req.login(registerdUser, (err) => {
        if(err) {
          return next(err);
        }else{
          req.flash("success", "Welcome to Wanderlust");
          res.redirect("/listings");
        }
      })
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
}

module.exports.renderLoginFrom = (req, res) => {
  res.render("./users/login.ejs");
}

module.exports.loginForm = async (req, res) => {
    req.flash("success", "Welcome back buddy!");
    const redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
}

module.exports.logoutUser = (req,res,next) => {
  req.logOut((err) => {
    if(err){
      return next(err);
    }else{
      req.flash("success","you are logged out!!");
      res.redirect("/listings");
    }
  })
}