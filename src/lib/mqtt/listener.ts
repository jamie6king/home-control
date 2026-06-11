//
// ~~~ mqtt listener
//

// imports
import client from "./mqtt"
import { type OnMessageCallback } from "mqtt"

// connect to mqtt
const mqtt = client()

// add listener
export default function setupListener(
    listeners: string[],
    callback: OnMessageCallback
) {
    listeners.forEach((listener) =>mqtt.subscribe(listener))

    mqtt.on("message", callback)
}
