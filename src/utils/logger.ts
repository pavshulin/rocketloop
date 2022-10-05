/* eslint-disable no-console */
import bunyan from "bunyan"
import PrettyStream from "bunyan-prettystream"

const prettyStdOut = new PrettyStream()
prettyStdOut.pipe(process.stdout)

const logger = bunyan.createLogger({
  name: "aio-gateway-service",
  streams: [
    {
      level: "debug",
      type: "raw",
      stream: prettyStdOut,
    },
  ],
})

//@ts-ignore
console.log = (...args) => logger.info(...args)

//@ts-ignore
console.info = (...args) => logger.info(...args)

//@ts-ignore
console.warn = (...args) => logger.warn(...args)

//@ts-ignore
console.error = (...args) => logger.error(...args)

//@ts-ignore
console.debug = (...args) => logger.debug(...args)

export const koaLogger = (str: string, args: any) => {
  if (!str.includes("healthz")) {
    console.log(str)
  }
}

export default logger
