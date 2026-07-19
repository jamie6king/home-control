//
// ~~~ .env file reader tests
//

// imports
import { vi, describe, beforeEach, it, expect } from "vitest"

// setup mocks
const mockReadFileSync = vi.fn()

vi.doMock("node:fs", () => ({
    readFileSync: mockReadFileSync
}))

// test function
describe("dotenv utility", () => {

    // setup mock
    beforeEach(() => {
        vi.resetModules()
        vi.resetAllMocks()
    })

    // no env file
    describe("has no env file", () => {
        it("returns an empty object", async () => {
            const dotenv = (await import("./dotenv")).default()

            expect(dotenv).toStrictEqual({})
        })
    })

    // env file
    describe("has an env file", () => {
        it("returns an object", async () => {
            mockReadFileSync.mockReturnValue("FOO=bar\nTEST=TEST")

            const dotenv = (await import("./dotenv")).default()

            expect(dotenv).toStrictEqual({
                "FOO": "bar",
                "TEST": "TEST"
            })
        })
    })
})
