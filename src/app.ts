//
// ~~~ main app
//

// imports
import express from "express"

// setup app
const app = express()

app.set("view engine", "pug")
app.set("views", "./src/views")

// export app
export default app
