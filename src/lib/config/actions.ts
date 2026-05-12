//
// ~~~ action configs
//

// imports
import { readFileSync } from "node:fs"

import type ActionsConfig from "@lib/config/actionss.types.ts"

// load config
const configFile = "data/actions.json"
let actionsConfig: ActionsConfig = {}

try {
    actionsConfig = JSON.parse(readFileSync(configFile, "utf8"))
} catch(e) {
    console.error("!> cannot read actions config")
}

// get all actions
const allActions = Object.keys(actionsConfig).map((action) => {

    const actionInfo = actionsConfig[action]

    return {
        ...actionInfo,
        id: action
    }

})

export default allActions
