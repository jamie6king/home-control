//
// ~~~ mqtt connector
//

// imports
import mqtt, { type MqttClient } from "mqtt"
import load from "@lib:dotenv"

// setup mqtt
const dotenv = load()

const HOST = dotenv.MQTT_HOST

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
