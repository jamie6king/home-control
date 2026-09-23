//
// ~~~ server process
//

// imports
import app from "./app"
import setupActions from "@lib:actions"
import applicationConfig from "@config:application"
import logger from "@lib:logger"

// setup actions
setupActions()
global.actions = {}

// setup app
const ADDR = applicationConfig.server.address
const PORT = applicationConfig.server.port
const VERSION = applicationConfig.app.version

// setup routes
import rootRoute from "./routes/root"
import statusRoute from "./routes/status"
import apiRoute from "./routes/api"
import dashboardRoute from "./routes/dashboard"

app.use("/", rootRoute)
app.use("/status", statusRoute)
app.use("/api", apiRoute)
app.use("/dashboard", dashboardRoute)

// start app
app.listen(PORT, ADDR, () => {
    logger.info(`=> starting home control ${VERSION} on ${ADDR}:${PORT.toString()}`)
})
