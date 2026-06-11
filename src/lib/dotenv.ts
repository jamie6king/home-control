//
// ~~~ read .env file
//

// imports
import { readFileSync } from "node:fs"

// load env file
export default function load(): { [env: string]: string} {
    const file = ".env" // TODO: don't hard-code this
    let fileEntries = {}

    try {
        const fileContents = readFileSync(file, "utf8")
            .split("\n")
            .filter((line) => line !== "")
            .map((line) => line.split("="))

        const fileMap = new Map(fileContents.map((line) => [ line[0], line[1] ]))
        fileEntries = Object.fromEntries(fileMap)

    } catch {
        console.error("!> cannot read .env file")
    }

    return fileEntries
}
