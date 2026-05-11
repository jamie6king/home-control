//
// ~~~ mqtt connector
//

// imports
import mqtt from "mqtt"
import loadDotenv from "./dotenv.ts"

const dotenv = loadDotenv()

// client connector
function _client() {
    let client

    if (global.mqttClient) {

        client = global.mqttClient

    } else {

        client = mqtt.connect(dotenv?.MQTT_HOST)
        global.mqttClient = client

    }

    return client
}

// send message
export async function sendMessage(topic, message) {

    const client = _client()
    const mqttTopic = `zigbee2mqtt/${topic}` // todo: don't hard-code zigbee2mqtt

    const messageResponse = await client.publishAsync(mqttTopic, message)

    return messageResponse
}

// add listener
export async function addListener(topic, callback) {

    const client = _client()
    const mqttTopic = `zigbee2mqtt/${topic}` // todo: don't hard-code zigbee2mqtt

    await client.subscribeAsync(mqttTopic)

    // todo: error handling

    client.on("message", (_, message) => {
        callback(message)
    })
}
