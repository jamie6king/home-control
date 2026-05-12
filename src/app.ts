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
import apiRouter from "@routes/api.ts"
import dashboardRouter from "@routes/dashboard.ts"

app.use("/api", apiRouter)
app.use("/", dashboardRouter)

// export app
export default app
