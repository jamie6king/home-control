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
describe("device configs", () => {

    // setup mock
    beforeEach(() => {
        vi.resetModules()
        vi.resetAllMocks()
    })

    // no config file
    describe("has no config file", () => {
        it("returns an empty array", async () => {
            const devices = (await import("./devices")).default

            expect(devices).toStrictEqual([])
        })
    })

    // config file
    describe("has a config file", () => {

        // no mqtt config
        it("returns an array of objects", async () => {
            mockReadFileSync.mockReturnValue(JSON.stringify({
                "test": {
                    "name": "test device",
                    "type": "light"
                }
            }))

            const devices = (await import("./devices")).default

            expect(devices).toHaveLength(1)
            expect(devices).toStrictEqual([
                {
                    "name": "test device",
                    "type": "light",
                    "mqtt": "test device",
                    "id": "test"
                }
            ])
        })

        // mqtt config
        it("returns an array of objects with given mqtt name", async () => {
            mockReadFileSync.mockReturnValue(JSON.stringify({
                "test": {
                    "name": "test device",
                    "mqtt": "test mqtt device",
                    "type": "light"
                }
            }))

            const devices = (await import("./devices")).default

            expect(devices).toHaveLength(1)
            expect(devices).toStrictEqual([
                {
                    "name": "test device",
                    "type": "light",
                    "mqtt": "test mqtt device",
                    "id": "test"
                }
            ])
        })
    })
})
