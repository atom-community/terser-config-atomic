const { getTerserRc } = require("./get-terserrc.js")
module.exports = getTerserRc(process.env.NODE_ENV, process.env.BABEL_ENV)
