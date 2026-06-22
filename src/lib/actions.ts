//
// ~~~ setup actions
//

// imports
import setupListener from "@lib:mqtt/listener"
import sendMessage from "@lib:mqtt/message"
import allActions from "@lib:config/actions"
import { ACTION_DO_ACTION, ACTION_ON_ACTION } from "@lib:config/actions.types"
import allDevices from "@lib:config/devices"
import logger from "@lib:logger"

// setup actions
export default function setupActions() {
    logger.info("=> setting up actions")

    // TODO: validate actions

    const actionTopics = allActions.map((action) => {
        const device = allDevices.find((device) => device.id === action.on.device)

        return device?.mqtt ? `zigbee2mqtt/${device.mqtt}` : ""
    }).filter((a) => a !== "")

    logger.debug(`  D> listening for ${actionTopics.length.toString()} topics`)

    // TODO: make the below more efficient
    setupListener(actionTopics, (topic, payload) => {
        const device = allDevices.find((device) => `zigbee2mqtt/${device.mqtt}` === topic)
        if (!device) return

        const action = allActions.filter((action) => action.on.device === device.id)

        action.forEach((action) => {

            // TODO: no it's not
            logger.debug(`D> running ${action.id} triggered by ${device.id}`)

            // TODO: add support for string outputs
            // TODO: tighten up the types
            type messageType = { [ key: string ]: string }
            const message = JSON.parse(payload.toString()) as messageType

            // TODO: hard-coding for testing
            if (message.action === "single" && action.on.action === ACTION_ON_ACTION.PRESS) {
                action.do.forEach((device) => {
                    const configDevice = allDevices.find((configDevice) => configDevice.id === device.device)
                    if (!configDevice) return

                    logger.debug(`  D> sending ${device.action} to ${configDevice.id}`)

                    if (device.action === ACTION_DO_ACTION.TOGGLE) {
                        sendMessage(`zigbee2mqtt/${configDevice.mqtt}/set`, { "state": "toggle" })
                    }
                })
            } else if (message.action === "on" && action.on.action === ACTION_ON_ACTION.ON) {
                action.do.forEach((device) => {
                    const configDevice = allDevices.find((configDevice) => configDevice.id === device.device)
                    if (!configDevice) return

                    logger.debug(`  D> sending ${device.action} to ${configDevice.id}`)

                    if (device.action === ACTION_DO_ACTION.ON) {
                        sendMessage(`zigbee2mqtt/${configDevice.mqtt}/set`, { "state": "ON" })
                    }
                })
            } else if (message.action === "off" && action.on.action === ACTION_ON_ACTION.OFF) {
                action.do.forEach((device) => {
                    const configDevice = allDevices.find((configDevice) => configDevice.id === device.device)
                    if (!configDevice) return

                    logger.debug(`  D> sending ${device.action} to ${configDevice.id}`)

                    if (device.action === ACTION_DO_ACTION.OFF) {
                        sendMessage(`zigbee2mqtt/${configDevice.mqtt}/set`, { "state": "OFF" })
                    }
                })
            }
        })
    })
}
