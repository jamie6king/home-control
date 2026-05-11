//
// ~~~ main app
//

// imports
import express from "express"

// setup app
const app = express()

app.set("view engine", "pug")
app.set("views", "./src/views")

// setup routes
import dashboardRouter from "@routes/dashboard"

app.use("/", dashboardRouter)

// export app
export default app
