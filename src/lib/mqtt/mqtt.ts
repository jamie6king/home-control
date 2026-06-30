//
// ~~~ mqtt connector
//

// imports
import mqtt, { type MqttClient } from "mqtt"
import applicationConfig from "@config:application"

// setup mqtt
const ADDR = applicationConfig.mqtt.address
const PORT = applicationConfig.mqtt.port
const HOST = `mqtt://${ADDR}:${PORT.toString()}`

// client connector
export default function client() {
    let client: MqttClient

    if (global.mqtt) {
        client = global.mqtt
    } else {
        client = mqtt.connect(HOST) // TODO: allow auth / other MQTT options
        global.mqtt = client
    }

    return client
}
