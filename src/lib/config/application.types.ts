//
// ~~~ application config types
//

// app config
export interface AppApplicationConfig {
    version: string;
}
// server config
export interface ServerApplicationConfig {
    address: string;
    port: number;
}

// mqtt config
export interface MQTTApplicationConfig {
    address: string;
    port: number;
    topic: string;
}

// data config
export interface DataApplicationConfig {
    baseDir: string;
    devicesFile: string;
    actionsFile: string;
}

// global application config
// TODO: document these in the README
export default interface ApplicationConfig {
    app: AppApplicationConfig;
    server: ServerApplicationConfig;
    mqtt: MQTTApplicationConfig;
    data: DataApplicationConfig;
}
