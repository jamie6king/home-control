//
// ~~~ global object
//

// imports
import { type MqttClient } from "mqtt"

// global object
declare global {
  var mqtt: MqttClient | undefined
  var actions: {
      [ action: string ]: NodeJS.Timeout;
  }
}
