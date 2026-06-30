//
// ~~~ application config
//

// imports
import load from "@lib:dotenv"
import type ApplicationConfig from "./application.types"

// load env variabes
const dotenv = load()
const getEnv = (name: string, backup: string) => process.env[name]  || dotenv[name] || backup

// set config
const config: ApplicationConfig = {
    "server": {
        "address": getEnv("HC_ADDRESS", "127.0.0.1"),
        "port": Number(getEnv("HC_PORT", "3000"))
    },
    "mqtt": {
        "address": getEnv("MQTT_ADDRESS", "127.0.0.1"),
        "port": Number(getEnv("MQTT_PORT", "1883")),
        "topic": getEnv("MQTT_TOPIC", "zigbee2mqtt")
    },
    "data": {
        "baseDir": getEnv("HC_DATA_DIR", "./data"),
        "devicesFile": getEnv("HC_DATA_DEVICES", `${getEnv("HC_DATA_DIR", "./data")}/devices.json`),
        "actionsFile": getEnv("HC_DATA_ACTIONS", `${getEnv("HC_DATA_DIR", "./data")}/actions.json`)
    }
}

// export config
export default config
