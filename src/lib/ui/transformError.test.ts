//
// ~~~ error transformer tests
//

// imports
import { describe, it, expect } from "vitest"
import transformError from "./transformError"
import { ERROR } from "./error.types"

// test function
describe("error transformer", () => {

    // valid errors
    describe("correctly transforms errors", () => {
        it("transforms device_not_found", () => {
            const message = transformError(ERROR.DEVICE_NOT_FOUND)
            expect(message).toBe("Error: Device not found.")
        })
    })

    // fallback
    describe("correctly handles invalid errors", () => {
        it("returns generic response", () => {
            const message = transformError("" as ERROR)
            expect(message).toBe("An unknown error has occured.")
        })
    })
})
