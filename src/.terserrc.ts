import { getTerserOptions } from "./get-terserrc.js"
module.exports = getTerserOptions(process.env.NODE_ENV, process.env.BABEL_ENV)
