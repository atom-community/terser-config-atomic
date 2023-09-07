import { getTerserOptions } from "./index.js"
module.exports = getTerserOptions(process.env.NODE_ENV, process.env.BABEL_ENV)
