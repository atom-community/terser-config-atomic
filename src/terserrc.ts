import { buildTerserOptions } from "./builder.js"
module.exports = buildTerserOptions(process.env.NODE_ENV, process.env.BABEL_ENV)
