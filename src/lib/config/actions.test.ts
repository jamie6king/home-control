//
// ~~~ action config tests
//

// imports
import { vi, describe, beforeEach, it, expect } from "vitest"

// setup mocks
const mockReadFileSync = vi.fn()

 vi.doMock("node:fs", () => ({
     readFileSync: mockReadFileSync
 }))

// test function
// TODO: fix the tsconfig aliasing for vitest
describe.skip("action configs", () => {

    // setup mock
    beforeEach(() => {
        vi.resetModules()
        vi.resetAllMocks()
    })

    // no config file
    describe("has no config file", () => {
        it("returns an empty array", async () => {
            const actions = (await import("./actions")).default

            expect(actions).toStrictEqual([])
        })
    })

    // config file
    describe("has a config file", () => {
        it("returns an array of objects", async () => {
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

            const actions = (await import("./actions")).default

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
