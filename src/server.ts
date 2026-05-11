//
// ~~~ server process
//

// imports
import app from "./app.ts"
import loadDotenv from "@lib/dotenv.ts"

// setup app
const dotenv = loadDotenv()

const PORT = dotenv?.HC_PORT || 3000

// start app
app.listen(PORT, () => {
    console.log(`=> starting homecontrol on port ${PORT}`)
})
