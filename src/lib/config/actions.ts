//
// ~~~ actions configs
//

// imports
import { readFileSync } from "node:fs"
import applicationConfig from "@config:application"
import type ActionsConfig from "./actions.types"

// load config
const configFile = applicationConfig.data.actionsFile
let actionsConfig: ActionsConfig = {}

try {
    actionsConfig = JSON.parse(readFileSync(configFile, "utf8")) as ActionsConfig
} catch {
    console.warn("!> cannot read actions config file")
}

// get all actions
const allActions = Object.entries(actionsConfig).map(([ id, action ]) => ({  ...action, id }))

export default allActions
