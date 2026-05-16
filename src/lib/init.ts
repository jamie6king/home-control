//
// ~~~ homecontrol init
//

// imports
import { validate, onPress, onMotion } from "@lib/helpers/action.ts"
import { addListener } from "@lib/mqtt.ts"
import allActions, { ACTION_ON_ACTION } from "@lib/config/actions.ts"
import allDevices from "@lib/config/devices.ts"

// initialise actions
function _initActions() {

    global.activeActions = []
    global.activeUndos = []

    if (!allActions || allActions.length < 1) return

    allActions.forEach((action) => {

        console.debug(`-> setting up ${action.id}`)

        const onDevice = allDevices.find((device) => device.id === action.on.device)

        if (!onDevice) {
            console.error(`!> unable to find ${action.on.device}`)
            return
        }

        // todo: use a single callback / listener & just subscribe to each topic
        // first param on return is the topic so case / switch that

        let topic

        if (["on", "off", "toggle"].includes(action.on)) {

            topic = `${onDevice.mqtt}/action`

        } else {

            topic = onDevice.mqtt

        }

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

                default:

                    // probbaly a json string
                    const jsonMessageAction = JSON.parse(messageAction)

                    if (jsonMessageAction?.presence !== undefined && action.on.action === "motion") {

                        onMotion(action, jsonMessageAction)

                    } else {

                        console.warn(`?> unknown action: ${messageAction} from ${topic}`)

                    }
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
