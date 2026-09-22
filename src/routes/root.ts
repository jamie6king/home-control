//
// ~~~ root route
//

// imports
import { Router } from "express"
import logger from "@lib:logger"

// setup router
const router = Router()

// root route
router.get("/", (_, res) => {
    logger.debug("D> loading root")

    res.redirect("/dashboard")
})

// export router
export default router
