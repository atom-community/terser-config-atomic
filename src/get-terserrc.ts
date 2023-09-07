export function getTerserOptions(NODE_ENV: string = "production", BABEL_ENV: string | undefined = undefined) {
  const isDev = NODE_ENV === "development"
  const isTest = NODE_ENV === "test"
  const isReadable = isDev || isTest

  const ProductionCompress = {
    global_defs: {
      // remove dev and test specific code for production
      "process.env.NODE_ENV": NODE_ENV || "production",
      "process.env.BABEL_ENV": BABEL_ENV || NODE_ENV || "production",
      "@atom.inSpecMode": !isTest ? "() => false" : "() => true",
      "@atom.inDevMode": !isDev ? "() => false" : "() => true",
    },
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
    passes: 2,
  }

  const TerserOptions = {
    // "module": false, // controlled by Parcel
    compress: isDev ? false : ProductionCompress,
    mangle: isReadable ? false : true,
    format: {
      beautify: isReadable,
    },
  }
  return TerserOptions
}
