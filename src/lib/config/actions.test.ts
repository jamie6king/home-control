//
// ~~~ action config tests
//

// imports
import { jest } from "@jest/globals"

// setup mocks
const mockReadFileSync = jest.fn()

jest.mock("node:fs", () => ({
    __esModule: true,
    readFileSync: () => mockReadFileSync()
}))

// test function
describe("action configs", () => {

    // setup mock
    beforeEach(() => {
        mockReadFileSync.mockReset()()
        jest.resetModules()
    })

    // no config file
    describe("has no config file", () => {
        it("returns an empty array", () => {
            const actions = require("./actions").default

            expect(actions).toStrictEqual([])
        })
    })

    // config file
    describe("has a config file", () => {
        it("returns an array of objects", () => {
            mockReadFileSync.mockReturnValue(JSON.stringify({
                "test": {
                    "name": "test action",
                    "on": {
                        "device": "test",
                        "action": "on"
                    },
                    "do": {
                        "device": "test",
                        "action": "off"
                    }
                }
            }))

            const actions = require("./actions").default

            expect(actions).toHaveLength(1)
            expect(actions).toStrictEqual([
                {
                    "name": "test action",
                    "id": "test",
                    "on": {
                        "device": "test",
                        "action": "on"
                    },
                    "do": {
                        "device": "test",
                        "action": "off"
                    }
                }
            ])
        })
    })
})
