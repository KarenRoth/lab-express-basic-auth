const session = require("express-session")

module.exports = app => {
  app.use(
    session({
      secret: "qwerqwrfwerwergqw",
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 60 * 1000 }
    })
  )
}
