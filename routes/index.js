var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var userModel = require("./users");
var postsModel = require("./post");
const passport = require("passport");
const upload = require("./multer");

const localStrategy = require("passport-local");
const users = require("./users");
passport.use(new localStrategy(userModel.authenticate()));
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/login", function (req, res, next) {
  res.render("login", { error: req.flash("error") });
});
router.get("/profile", isLoggedin, async function (req, res, next) {
  const user = await userModel
    .findOne({
      username: req.session.passport.user,
    })
    .populate("posts");
  console.log(user);

  res.render("profile", { user });
});

router.get("/feed", isLoggedin, function (req, res, next) {
  res.render("feed");
});

router.post("/register", (req, res) => {
  const { username, email, fullname } = req.body;
  const userData = new userModel({ username, email, fullname });

  userModel.register(userData, req.body.password).then(function () {
    passport.authenticate("local")(req, res, function () {
      res.redirect("/profile");
    });
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {}
);

router.post(
  "/uploads",
  upload.single("file1"),
  async function (req, res, next) {
    try {
      if (!req.file) {
        return res.status(404).send("Ressource not founds");
      }
      const user = await userModel.findOne({
        username: req.session.passport.user,
      });
      const post = await postsModel.create({
        image: req.file.filename,
        imageText: req.body.filecapt,
        user: user._id,
      });

      user.posts.push(post._id);
      await user.save();
      res.send("done");
    } catch (err) {
      console.log(err);
    }
  }
);
router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

function isLoggedin(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

module.exports = router;
