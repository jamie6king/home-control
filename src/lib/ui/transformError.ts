/* eslint-disable @typescript-eslint/no-unnecessary-condition */

//
// ~~~ error transformer
//

// imports
import { ERROR } from "./error.types"
import logger from "@lib:logger"

// transform
export default function transformError(error: ERROR) {
    switch (error) {
        case ERROR.DEVICE_NOT_FOUND:
            return "Error: Device not found."
        default:
            logger.warn(`!> Unknown error ${error as string} has been thrown in the UI.`)
            return "An unknown error has occured."
    }
}
