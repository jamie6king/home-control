//
// ~~~ server process
//

// imports
import app from "./app"

// setup app
const PORT = 3000

// start app
app.listen(PORT, () => {
    console.log(`=> starting home control on port ${PORT.toString()}`)
})
