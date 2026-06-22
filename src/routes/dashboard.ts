//
// ~~~ dashboard route
//

// imports
import { Router } from "express"
import logger from "@lib:logger"

// setup router
const router = Router()

// home route
router.get("/", (_, res) => {
    logger.debug("D> loading dashboard home")

    res.render("index")
})

// export router
export default router
