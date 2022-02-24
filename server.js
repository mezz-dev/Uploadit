const express = require('express')
const app = express()
const connectDb = require("./server/database/connect")
const path = require("path")
const session = require("express-session")
const flash = require("express-flash")
const expressLayouts = require("express-ejs-layouts")
const errorHandler = require("./server/middleware/error-handler")
const notFound = require("./server/middleware/not-found")
const passport = require("passport")
const configPassport = require("./server/config/passport")
const cookieParser = require("cookie-parser")

// load environment variables in process.env
require("dotenv").config({path: 'config.env'})


// load assets
app.use("/assets", express.static(path.join(__dirname, "/server/assets/")))
app.use("/css", express.static(path.join(__dirname, "/server/assets/css/")))
app.use("/js", express.static(path.join(__dirname, "/server/assets/js/")))
app.use("/img", express.static(path.join(__dirname, "/server/assets/img/")))

app.use(cookieParser())

// config view engine and express layout
app.set("view engine", "ejs")
app.set("views", "server/views")
app.use(expressLayouts)
app.set("layout", "layouts/layout")

app.use(express.json({limit: "50mb"}))
app.use(express.urlencoded({extended:true}))

// config session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

// use flash messages
// helps you to send message whenever you are redirecting
app.use(flash())

// config passport
// using Local strategy
configPassport(passport)
app.use(passport.initialize())
app.use(passport.session())

// main router
app.use("/", require("./server/routes/index"))


// middleware
app.use(notFound)
app.use(errorHandler)

// connect to database
// start the server
const start = async () => {
    try {
        await connectDb()
        const PORT = process.env.PORT || 8080
        app.listen(PORT, err => {
            if(err) return console.log(err)
            console.log(`server listening on port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()