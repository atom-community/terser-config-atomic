const isDev = process.env.NODE_ENV === "development"
const isTest = process.env.NODE_ENV === "test"
const isReadable = isDev || isTest

const ProductionCompress = {
  global_defs: {
    // remove dev and test specific code for production
    "process.env.NODE_ENV": process.env.NODE_ENV || "production",
    "process.env.BABEL_ENV": process.env.BABEL_ENV || process.env.NODE_ENV || "production",
    "@atom.inSpecMode": !isTest ? "() => false" : "() => true",
    "@atom.inDevMode": !isDev ? "() => false" : "() => true",
  },
  ecma: "2018",
  toplevel: true,
  hoist_vars: false,
  hoist_funs: true,
  pure_getters: true,
  unsafe: true,
  unsafe_arrows: true,
  unsafe_comps: true,
  unsafe_Function: true,
  unsafe_math: true,
  unsafe_symbols: true,
  unsafe_methods: true,
  unsafe_proto: true,
  unsafe_regexp: true,
  unsafe_undefined: true,
  passes: 3,
}

const TerserOptions = {
  // "module": false, // controlled by Parcel
  compress: isDev ? false : ProductionCompress,
  parse: {
    ecma: 2020,
  },
  mangle: isReadable ? false : true,
  format: {
    beautify: isReadable,
  },
}
module.exports = TerserOptions
