/**
 * Get the terser options for the given environment.
 *
 * @param NODE_ENV - The Node environment (defaults to "production").
 * @param BABEL_ENV - The Babel environment (defaults to NODE_ENV).
 * @param unsafeCompress - Whether to use unsafe compression options (defaults to false).
 */
export function buildTerserOptions(
  NODE_ENV: string = "production",
  BABEL_ENV: string | undefined = undefined,
  unsafeCompress: boolean = false,
) {
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
    toplevel: unsafeCompress,
    hoist_vars: false,
    hoist_funs: true,
    pure_getters: unsafeCompress || "strict",
    unsafe: unsafeCompress,
    unsafe_arrows: unsafeCompress,
    unsafe_comps: unsafeCompress,
    unsafe_Function: unsafeCompress,
    unsafe_math: unsafeCompress,
    unsafe_symbols: unsafeCompress,
    unsafe_methods: unsafeCompress,
    unsafe_proto: unsafeCompress,
    unsafe_regexp: unsafeCompress,
    unsafe_undefined: unsafeCompress,
    passes: 2,
  }

  const TerserOptions = {
    // "module": false, // controlled by Parcel
    compress: isDev ? false : ProductionCompress,
    mangle: isReadable ? false : true,
    format: {
      comments: isReadable,
      beautify: isReadable,
    },
  }
  return TerserOptions
}
