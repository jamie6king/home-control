//
// ~~~ dashboard routing
//

// imports
import { Router } from "express"

// setup router
const router = Router()

// main route
router.get("/", (_, res) => {
    res.render("pages/dashboard/home")
})

// export router
export default router
