/* eslint-disable no-unused-vars */

//
// ~~~ global object
//

// imports
import { type MqttClient } from "mqtt"

// global object
declare global {
  var mqtt: MqttClient | undefined
}
