//
// ~~~ device helper utilities
//

// imports
import { sendMessage } from "@lib/mqtt.ts"
import allDevices from "@lib/config/devices.ts"

// set state
export async function setState(device, state) {

    const deviceInfo = allDevices.find((dev) => dev.id === device)

    if (!deviceInfo) return false

    const deviceTopic = `${deviceInfo.mqtt}/set`
    const deviceMessage = JSON.stringify({ "state": state })

    return sendMessage(deviceTopic, deviceMessage)
}
