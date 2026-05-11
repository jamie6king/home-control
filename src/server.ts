//
// ~~~ server process
//

// setup app
import app from "./app.ts"

const PORT = 3000

// start app
app.listen(PORT, () => {
    console.log(`=> starting homecontrol on port ${PORT}`)
})
