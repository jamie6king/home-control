//
// ~~~ logger
//

// logger type
export interface Logger {
    debug: (text: string) => void;
    info: (text: string) => void;
    warn: (text: string) => void;
    error: (text: string) => void;
}

// debug logging
const debug = (text: string) => { console.debug("%c" + text, "color:grey;") }

// info logging
const info = (text: string) => { console.log(text) }

// warn logging
const warn = (text: string) => { console.warn(text) }

// error logging
const error = (text: string) => { console.error(text) }

// export logger
const logger: Logger = {
    debug,
    info,
    warn,
    error
}
export default logger
