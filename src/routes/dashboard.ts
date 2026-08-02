//
// ~~~ dashboard route
//

// imports
import { Router } from "express"
import allDevices from "@lib:config/devices"
import allActions from "@lib:config/actions"
import logger from "@lib:logger"

// setup router
const router = Router()

// home route
router.get("/", (_, res) => {
    logger.debug("D> loading dashboard home")

    res.render("index")
})

// devices route
router.get("/devices", (_, res) => {
    logger.debug("D> loading dashboard devices")

    res.render("devices", {
        devices: allDevices
    })
})

// actions route
router.get("/actions", (_, res) => {
    logger.debug("D> loading dashboard actions")

    res.render("actions", {
        actions: allActions
    })
})

// settings route
router.get("/settings", (_, res) => {
    logger.debug("D> loading dashboard settings")

    res.render("settings")
})

// about route
router.get("/about", (_, res) => {
    logger.debug("D> loading dashboard about")

    res.render("about")
})

// export router
export default router
