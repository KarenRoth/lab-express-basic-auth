const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const User = require("../models/User.model")

router.get("/signup", (req, res) => {
  res.render("auth/signup")
})

router.post("/signup", async (req, res) => {
  // res.send(req.body)
  const { username, password } = req.body
  if (username === "" || password === "") {
    res.render("auth/signup", { error: "Missing fiels" })
  }
  const salt = bcrypt.genSaltSync(12)
  const hashpwd = bcrypt.hashSync(password, salt)
  await User.create({
    username,
    password: hashpwd
  })
  res.redirect("/login")
})
router.get("/login", (req, res) => {
  res.render("auth/login")
})

router.post("/login", async (req, res) => {
  // res.send(req.body)

  const { username, password } = req.body
  if (username === "" || password === "") {
    return res.render("auth/login", { error: "Missing fiels" })
  }
  const user = await User.findOne({ username })

  if (!user) {
    return res.render("auth/login", { error: "Se rompio" })
  }

  if (bcrypt.compareSync(password, user.password)) {
    user.password = null
    req.session.currentUser = user
    return res.redirect("/profile")
  }
  return res.render("auth/login", { error: "Olvidaste tu contrase~a?" })
})

router.get("/profile", (req, res) => {
  res.render("auth/profile")
})

router.get("/main", (req, res) => {
  res.render("main")
})

router.get("/private", (req, res) => {
  console.log(req.session.currentUser)
  res.render("private", { user: req.session.currentUser })
})

module.exports = router
