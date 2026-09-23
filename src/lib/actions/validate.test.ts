//
// ~~~ validate actions tests
//

// imports
import { vi, describe, beforeEach, it, expect } from "vitest"
import validateActions from "./validate"
import type ActionsConfig from "@lib:config/actions.types"

// setup mocks
vi.mock("@lib:config/devices", () => ({}))

// test function
describe("actions validator", () => {

    // setup mock
    beforeEach(() => {
        vi.resetModules()
        vi.resetAllMocks()
    })

    // valid actions
    describe("correctly validates valid actions", () => {
        it("returns true with no actions", () => {
            const actions = {}
            const result = validateActions(actions)

            expect(result).toBe(true)
        })
    })

    // invalid actions
    describe("correctly validates invalid actions", () => {

        // wrong actions type
        describe("invalid type", () => {
            it("returns false with just a string", () => {
                const actions = ""
                const result = validateActions(actions as unknown as ActionsConfig)

                expect(result).toBe(false)
            })

            it("returns false with just a number", () => {
                const actions = 67
                const result = validateActions(actions as unknown as ActionsConfig)

                expect(result).toBe(false)
            })

            it("returns false with just a boolean", () => {
                const actions = true
                const result = validateActions(actions as unknown as ActionsConfig)

                expect(result).toBe(false)
            })
        })
    })
})
