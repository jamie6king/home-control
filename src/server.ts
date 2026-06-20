//
// ~~~ server process
//

// imports
import app from "./app"
import load from "@lib:dotenv"

// setup app
const dotenv = load()

const PORT = Number(dotenv.HC_PORT) || 3000

// setup routes
import statusRoute from "./routes/status"

app.use("/status", statusRoute)

// start app
app.listen(PORT, () => {
    console.log(`=> starting home control on port ${PORT.toString()}`)
})
