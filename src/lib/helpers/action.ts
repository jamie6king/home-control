//
// ~~~ action helper utilities
//

// imports
import { sendMessage } from "@lib/mqtt.ts"
import allActions from "@lib/config/actions.ts"
import allDevices from "@lib/config/devices.ts"

// run actions
function _runActions(actions) {

    actions.forEach((action) => {

        const device = allDevices.find((device) => device.id === action.device)

        // todo: error handling

        const topic = `${device.mqtt}/set`
        const message = JSON.stringify({ state: action.action.toUpperCase() })

        console.debug(`    -> send state ${action.action} to ${action.device}`)
        sendMessage(topic, message)

    })
}

// run on button press
export function onPress(action) {

    console.debug(`-> running ${action.id}`)

    _runActions(action.do)
}

// run on motion
export function onMotion(action, payload) {

    if (payload.presence === true) {

        console.debug(`-> running ${action.id}`)

        if (!global.activeActions.includes(action.id)) {
            global.activeActions.push(action.id)
        }

        if (global.activeUndos.includes(action.id)) {
            global.activeUndos = global.activeUndos.filter((trigger) => trigger !== action.id)
        }

        _runActions(action.do)

    } else {

        if (global.activeActions.includes(action.id)) {

            console.debug(`-> undoing ${action.id}`)

            const inverseActions = action.do.map((inverseAction) => {
                let actionDo

                switch (inverseAction.action) {
                    case "on":
                        actionDo = "off"
                        break

                    case "off":
                        actionDo = "on"
                        break

                    default:
                        actionDo = inverseAction.action
                }

                return {
                    ...inverseAction,
                    action: actionDo
                }
            })

            global.activeActions = global.activeActions.filter((trigger) => trigger !== action.id)

            _runActions(inverseActions)
        }
    }
}

// validate actions config
export function validate() {

    if (allActions.length < 1) return true

    return allActions.every((action) => {

        const onDevice = allDevices.find((device) => device.id === action.on.device)
        if (!onDevice) return false

        // todo: rest of the props

        return true
    })
}
