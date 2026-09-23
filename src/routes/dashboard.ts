//
// ~~~ dashboard route
//

// imports
import { Router } from "express"
import allDevices from "@lib:config/devices"
import allActions from "@lib:config/actions"
import transformError from "@lib:ui/transformError"
import logger from "@lib:logger"
import type { ERROR as UI_ERROR } from "@lib:ui/error.types"

// setup router
const router = Router()

// home route
router.get("/", (_, res) => {
    logger.debug("D> loading dashboard home")

    res.render("index", {
        page: { title: "Home Control" }
    })
})

// devices route
router.get("/devices", (req, res) => {
    logger.debug("D> loading dashboard devices")

    let error
    if (req.query.error) {
        console.log("Penis")
        error = transformError(req.query.error as UI_ERROR)
    }

    res.render("devices", {
        page: { title: "Devices" },
        devices: allDevices,
        error
    })
})

// device route
router.get("/devices/:device", (req, res) => {
    const deviceId = req.params.device
    logger.debug(`D> loading ${deviceId} dashboard`)

    const device = allDevices.find((device) => device.id === deviceId)

    if (!device) {
        res.redirect("/dashboard/devices?error=device_not_found")
        return
    }

    res.render("device", {
        page: { title: device.name || device.id },
        device
    })
})

// actions route
router.get("/actions", (_, res) => {
    logger.debug("D> loading dashboard actions")

    res.render("actions", {
        page: { title: "Actions" },
        actions: allActions
    })
})

// settings route
router.get("/settings", (_, res) => {
    logger.debug("D> loading dashboard settings")

    res.render("settings", {
        page: { title: "Settings" },
    })
})

// about route
router.get("/about", (_, res) => {
    logger.debug("D> loading dashboard about")

    res.render("about", {
        page: { title: "About" },
    })
})

// export router
export default router
