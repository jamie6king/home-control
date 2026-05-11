//
// ~~~ device configs
//

// imports
import { readFileSync } from "node:fs"

import type DevicesConfig from "@lib/config/devices.types.ts"

// load config
const configFile = "data/devices.json"
let devicesConfig: DevicesConfig = {}

try {
    devicesConfig = JSON.parse(readFileSync(configFile, "utf8"))
} catch(e) {
    console.error("!> cannot read devices config")
}

// get all devices
const allDevices = Object.keys(devicesConfig).map((device) => {

    const deviceInfo = devicesConfig[device]

    return {
        ...deviceInfo,
        id: device
    }

})

export default allDevices
