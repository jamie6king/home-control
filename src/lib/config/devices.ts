//
// ~~~ device configs
//

// imports
import { readFileSync } from "node:fs"
import type DevicesConfig from "./devices.types"

// load config
const configFile = "data/devices.json" // TODO: don't hard-code
let devicesConfig: DevicesConfig = {}

try {
    devicesConfig = JSON.parse(readFileSync(configFile, "utf8")) as DevicesConfig
} catch {
    console.error("!> cannot read device config file")
}

// get all devices
const allDevices = Object.keys(devicesConfig).map((device) => {
    const deviceInfo = devicesConfig[device] // TODO: probably a better way to get this info

    if (!deviceInfo.mqtt) deviceInfo.mqtt = deviceInfo.name

    return {
        ...deviceInfo,
        id: device
    }
})

export default allDevices
