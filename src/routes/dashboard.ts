//
// ~~~ dashboard routing
//

// imports
import { Router } from "express"
import allDevices from "@lib/config/devices.ts"
import allActions from "@lib/config/actions.ts"

// setup router
const router = Router()

// main route
router.get("/", (_, res) => {
    res.render("pages/dashboard/home")
})

// all devices
router.get("/devices", (_, res) => {
    res.render("pages/dashboard/devices", {
        devices: allDevices
    })
})

// all actions
router.get("/actions", (_, res) => {
    res.render("pages/dashboard/actions", {
        actions: allActions
    })
})

// export router
export default router
