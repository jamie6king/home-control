//
// ~~~ device config types
//

// individual device configs
export interface DeviceConfig {
    name: string,
    mqtt: string
}

// global device config
export default interface DevicesConfig {
    [ index: string ]: DeviceConfig
}
