//
// ~~~ device configs
//

// imports
import { readFileSync } from "node:fs"
import applicationConfig from "@config:application"
import type DevicesConfig from "./devices.types"

// load config
const configFile = applicationConfig.data.devicesFile
let devicesConfig: DevicesConfig = {}

try {
    devicesConfig = JSON.parse(readFileSync(configFile, "utf8")) as DevicesConfig
} catch {
    console.warn("!> cannot read device config file")
}

// get all devices
const allDevices = Object.entries(devicesConfig).map(([ id, device ]) => ({
    ...device,
    id,
    mqtt: device.mqtt ? device.mqtt : device.name
}))

export default allDevices
