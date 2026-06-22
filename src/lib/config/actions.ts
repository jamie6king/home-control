//
// ~~~ actions configs
//

// imports
import { readFileSync } from "node:fs"
import type ActionsConfig from "./actions.types"

// load config
const configFile = "data/actions.json" // TODO: don't hard-code
let actionsConfig: ActionsConfig = {}

try {
    actionsConfig = JSON.parse(readFileSync(configFile, "utf8")) as ActionsConfig
} catch {
    console.warn("!> cannot read actions config file")
}

// get all actions
const allActions = Object.entries(actionsConfig).map(([ id, action ]) => ({  ...action, id }))

export default allActions
