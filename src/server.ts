//
// ~~~ server process
//

// imports
import app from "./app"
import setupActions from "@lib:actions"
import load from "@lib:dotenv"
import logger from "@lib:logger"

// setup actions
setupActions()

// setup app
const dotenv = load()

const PORT = Number(dotenv.HC_PORT) || 3000

// setup routes
import statusRoute from "./routes/status"
import apiRoute from "./routes/api"
import dashboardRoute from "./routes/dashboard"

app.use("/status", statusRoute)
app.use("/api", apiRoute)
app.use("/dashboard", dashboardRoute)

// start app
app.listen(PORT, () => {
    logger.info(`=> starting home control on port ${PORT.toString()}`)
})
