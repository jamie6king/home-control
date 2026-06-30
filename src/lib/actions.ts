//
// ~~~ setup actions
//

// imports
import setupListener from "@lib:mqtt/listener"
import validateActions from "@lib:actions/validate"
import runAction from "@lib:actions/run"
import allActions from "@lib:config/actions"
import type ActionsConfig from "@lib:config/actions.types"
import allDevices from "@config:devices"
import applicationConfig from "@config:application"
import logger from "@lib:logger"

// setup mqtt
const TOPIC = applicationConfig.mqtt.topic

// setup actions
export default function setupActions() {
    logger.info("=> setting up actions")

    logger.debug("  D> checking action validity...")
    const isValid = validateActions(allActions as unknown as ActionsConfig) // TODO: fix the typing here

    if (isValid) {
        logger.debug("  D> actions validated")
    } else {
        logger.warn("  !> invalid actions config")
        return
    }

    const actionTopics = allActions.map((action) => {
        const device = allDevices.find((device) => device.id === action.on.device)

        return device?.mqtt ? `${TOPIC}/${device.mqtt}` : ""
    }).filter((a) => a !== "")

    logger.debug(`  D> listening for ${actionTopics.length.toString()} topics`)

    // TODO: make the below more efficient
    setupListener(actionTopics, (topic, payload) => {
        const device = allDevices.find((device) => `${TOPIC}/${device.mqtt}` === topic)
        if (!device) return

        const action = allActions.filter((action) => action.on.device === device.id)
        action.forEach((action) => { runAction(action, payload) })
    })
}
