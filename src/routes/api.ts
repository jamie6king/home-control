//
// ~~~ api route
//

// imports
import { Router } from "express"
import sendMessage from "@lib:mqtt/message"
import allDevices from "@lib:config/devices"
import { DEVICE_TYPE } from "@config:devices.types"
import applicationConfig from "@config:application"
import logger from "@lib:logger"

// setup router
const router = Router()

// setup mqtt
const TOPIC = applicationConfig.mqtt.topic

// toggle device
router.get("/device/:id/toggle", (req, res) => {
    const device = req.params["id"]
    const config = allDevices.find((configDevice) => configDevice.id === device)

    if (!config) return res.status(400).send({ "error": "device not found" })
    if (config.type !== DEVICE_TYPE.LIGHT) return res.status(400).send({ "error": `invalid action for ${config.type}`})

    logger.debug(`D> toggling ${device}`)

    sendMessage(`${TOPIC}/${config.mqtt}/set`, { "state": "toggle" })
    res.status(200).send()
})

// export router
export default router
