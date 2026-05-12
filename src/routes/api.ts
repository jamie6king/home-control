//
// ~~~ api routing
//

// imports
import { Router } from "express"
import { setState } from "@lib/helpers/device.ts"

// setup router
const router = Router()

// toggle device
router.get("/device/:id/toggle", async (req, res) => {

    const device = req.params.id
    const state = await setState(device, "TOGGLE")

    console.debug(`-> toggling ${device}`)

    if (state === false) {

        console.error(`!> cannot toggle ${device}`)
        res.sendStatus(500)

    } else {

        res.sendStatus(200)

    }
})

// export router
export default router
