//
// ~~~ device config tests
//

// setup mocks
const mockReadFileSync = jest.fn()

jest.mock("node:fs", () => ({
    __esModule: true,
    readFileSync: () => mockReadFileSync()
}))

// test function
describe("device configs", () => {

    // setup mock
    beforeEach(() => {
        mockReadFileSync.mockReset()()
        jest.resetModules()
    })

    // no config file
    describe("has no config file", () => {
        it("returns an empty array", () => {
            const devices = require("./devices").default

            expect(devices).toStrictEqual([])
        })
    })

    // config file
    describe("has a config file", () => {

        // no mqtt config
        it("returns an array of objects", () => {
            mockReadFileSync.mockReturnValue(JSON.stringify({
                "test": {
                    "name": "test device",
                    "type": "light"
                }
            }))

            const devices = require("./devices").default

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

        // no mqtt config
        it("returns an array of objects with given mqtt name", () => {
            mockReadFileSync.mockReturnValue(JSON.stringify({
                "test": {
                    "name": "test device",
                    "mqtt": "test mqtt device",
                    "type": "light"
                }
            }))

            const devices = require("./devices").default

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
