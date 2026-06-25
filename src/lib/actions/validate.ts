//
// ~~~ validate actions
//

import type ActionsConfig from "@lib:config/actions.types"
import { ACTION_DO_ACTION, ACTION_ON_ACTION } from "@lib:config/actions.types"
import allDevices from "@lib:config/devices"

// validate actions
export default function validateActions(actions: ActionsConfig): boolean {
    if (Object.keys(actions).length < 0) return true

    // TODO: expand the validation checks
    return Object.values(actions).every((action) => {

        // check "on" config
        if (!allDevices.find((device) => device.id === action.on.device)) return false
        if (!Object.values(ACTION_ON_ACTION).includes(action.on.action)) return false

        // TODO: check that the "on" action can apply to device type

        // check "do" config
        if (action.do.length < 1) return false

        const invalidDo = action.do.some((action) => {
            if (!allDevices.find((device) => device.id === action.device)) return true
            if (!Object.values(ACTION_DO_ACTION).includes(action.action)) return true

            // TODO: more checks

            return false
        })

        if (invalidDo) return false

        return true
    })
}
