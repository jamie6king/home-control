//
// ~~~ action config types
//

// action "on" actions
export enum ACTION_ON_ACTION {
    PRESS = "press",
    OFF = "off",
    ON = "on",
    MOTION = "motion",
}

// action "on" type
export interface ActionOnType {
    device: string;
    action: ACTION_ON_ACTION;
}

// action "if" types
export enum ACTION_IF_TYPE {
    ALL = "all",
    ANY = "any",
}

// action "if" status
export enum ACTION_IF_STATUS {
    ON = "on",
    OFF = "off",
}

// action "if" type
export interface ActionIfType {
    device: string;
    status: ACTION_IF_STATUS;
}

// action "do" actions
export enum ACTION_DO_ACTION {
    ON = "on",
    OFF = "off",
    TOGGLE = "toggle",
}

// action "do" type
export interface ActionDoType {
    device: string;
    action: ACTION_DO_ACTION;
    order?: number;
}

// individual action config
export interface ActionConfig {
    name: string;
    enabled?: boolean;
    on: ActionOnType;
    ifType?: ACTION_IF_TYPE;
    if?: ActionIfType;
    do: ActionDoType[];
    timeout?: number;
    timeoutDo?: ActionDoType[];
}

// global action configs
export default interface ActionsConfig {
    [ index: string ]: ActionConfig;
}
