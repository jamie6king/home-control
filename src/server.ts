//
// ~~~ server process
//

// imports
import app from "./app.ts"
import init from "@lib/init.ts"
import loadDotenv from "@lib/dotenv.ts"

// setup app
const dotenv = loadDotenv()
const PORT = dotenv?.HC_PORT || 3000

init()

// start app
app.listen(PORT, () => {
    console.log(`=> starting homecontrol on port ${PORT}`)
})
