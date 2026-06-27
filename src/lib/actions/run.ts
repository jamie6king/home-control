//
// ~~~ action runner
//

// imports
import sendMessage from "@lib:mqtt/message"
import { ACTION_ON_ACTION, type ActionDoType, type ActionConfig } from "@lib:config/actions.types"
import allDevices from "@lib:config/devices"
import logger from "@lib:logger"

// TODO: make more dynamic
// run single action
function _run(action: ActionDoType) {
    const configDevice = allDevices.find((configDevice) => configDevice.id === action.device)
    if (!configDevice) return

    logger.debug(`  D> sending ${action.action} to ${action.device}`)
    sendMessage(`zigbee2mqtt/${configDevice.mqtt}/set`, { "state": action.action.toString()})
}

// run action
export default function runAction(action: ActionConfig, payload: Buffer) {

    // TODO: add support for string outputs
    // TODO: tighten up the types
    type messageType = { [ key: string ]: string }
    const message = JSON.parse(payload.toString()) as messageType

    // TODO: expand conversions
    if (message.action === "single") message.action = ACTION_ON_ACTION.PRESS.toString()

    if (
        message.action === action.on.action.toString() ||
        (Boolean(message.presence) && action.on.action === ACTION_ON_ACTION.MOTION)
    ) {
        logger.debug(`D> ${action.on.device} triggered the "${action.name}" action`)

        action.do.forEach(_run)

        // TODO: make more robust
        if (action.timeout && action.timeoutDo && action.timeoutDo.length > 0) {

            // TODO: use id
            if (Object.keys(global.actions).includes(action.name)) {
                global.actions[action.name].refresh()
            } else {
                global.actions[action.name] = setTimeout(() => {

                    if (!action.timeoutDo) return
                    action.timeoutDo.forEach(_run)

                }, action.timeout)
            }
        }
    }

}
