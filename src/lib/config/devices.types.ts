//
// ~~~ device config types
//

// device types
export enum DEVICE_TYPE {
    LIGHT = "light",
    MOTION = "motion",
    BUTTON = "button",
}

// individual device config
export interface DeviceConfig {
    name: string;
    mqtt?: string;
    type: DEVICE_TYPE;
}

// global device configs
export default interface DevicesConfig {
    [ index: string ]: DeviceConfig;
}
