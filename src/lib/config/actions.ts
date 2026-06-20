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
const allActions = Object.keys(actionsConfig).map((action) => {
    const actionInfo = actionsConfig[action] // TODO: probably a better way to get this info

    return {
        ...actionInfo,
        id: action
    }
})

export default allActions
