//
// ~~~ mqtt message sending
//

// imports
import client from "./mqtt"

// connect to mqtt
const mqtt = client()

// send message
export default function sendMessage(
    topic: string,
    message: string | object
) {
    if (message instanceof Object) message = JSON.stringify(message)

    return mqtt.publish(topic, message)
}
