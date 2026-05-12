//
// ~~~ action helper utilities
//

// imports
import { sendMessage } from "@lib/mqtt.ts"
import allActions from "@lib/config/actions.ts"
import allDevices from "@lib/config/devices.ts"

// run on button press
export function onPress(action) {

    console.debug(`-> running ${action.id}`)

    const actionDo = action.do

    actionDo.forEach((action) => {

        const device = allDevices.find((device) => device.id === action.device)

        // todo: error handling

        const topic = `${device.mqtt}/set`
        const message = JSON.stringify({ state: action.action.toUpperCase() })

        console.debug(`    -> send state ${action.action} to ${action.device}`)
        sendMessage(topic, message)

    })
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
