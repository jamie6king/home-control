//
// ~~~ status route
//

// imports
import { Router } from "express"
import logger from "@lib:logger"

// setup router
const router = Router()

// status route
router.get("/", (_, res) => {
    logger.debug("D> sending service status")

    res.status(200).send({
        "status": "ok"
    })
})

// export router
export default router
