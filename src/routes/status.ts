//
// ~~~ status route
//

// imports
import { Router } from "express"

// setup router
const router = Router()

// status route
router.get("/", (_, res) => {
    console.debug("D> sending service status")

    res.status(200).send({
        "status": "ok"
    })
})

// export router
export default router
