//
// ~~~ read a .env file
//

// imports
import { readFileSync } from "node:fs"

// load .env function
export default function loadDotenv() {

    const file: string = ".env" // todo: don't hard-code the location

    try {

        const fileContents = readFileSync(file, "utf8")
            .split("\n")
            .filter((line) => line !== "")
            .map((line) => line.split("="))

        const fileEntries = new Map(fileContents)
        return Object.fromEntries(fileEntries)

    } catch(e) {

        console.error("!> cannot read .env file")

    }
}
