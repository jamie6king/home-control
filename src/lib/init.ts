//
// ~~~ homecontrol init
//

// imports
import { validate, onPress } from "@lib/helpers/action.ts"
import { addListener } from "@lib/mqtt.ts"
import allActions, { ACTION_ON_ACTION } from "@lib/config/actions.ts"
import allDevices from "@lib/config/devices.ts"

// initialise actions
function _initActions() {

    if (!allActions || allActions.length < 1) return

    allActions.forEach((action) => {

        console.debug(`-> setting up ${action.id}`)

        const onDevice = allDevices.find((device) => device.id === action.on.device)

        if (!onDevice) {
            console.error(`!> unable to find ${action.on.device}`)
            return
        }

        const topic = `${onDevice.mqtt}/action`
        const callback = (message) => {

            const messageAction = message.toString()

            switch (messageAction) {

                case "toggle":
                    if (action.on.action === "press") { // todo: use enum
                        onPress(action)
                    }

                    break

                case "on":
                    if (action.on.action === "press" || action.on.action === "on") {
                        onPress(action)
                    }

                    break

                case "off":
                    if (action.on.action === "press" || action.on.action === "off") {
                        onPress(action)
                    }

                    break

            }
        }

        addListener(topic, callback)
    })
}

// initialise homecontrol
export default function init() {

    console.debug("=> initialising homecontrol")

    const isActionsValid = validate()

    if (!isActionsValid) {
        console.error("!> invalid actions config")
    } else {
        _initActions()
    }
}
