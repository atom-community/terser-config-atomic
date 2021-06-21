# terser-config-atomic

The Terser configuration used in atom-community.

## Installation

```
npm install --save-dev terser-config-atomic
```

<details>
<summary>This package also needs `Terser`.</summary>

Either add the following to your `.npmrc` if using `pnpm` to hoist the Terser bundled with the config

```
public-hoist-pattern[]=*
```

Or install `terser` yourself in your `devDependencies`.

If using `npm`, the terser dependency is hoisted automatically.

If you use `Parcel` or `rullup-plugin-atomic`, `Terser` is already included.

</details>

## Usage

Create a `.terserrc.js` with the following content

.terserrc.js

```js
module.exports = require("terser-config-atomic")
```

The config is adapted based on `NODE_ENV`, so make sure to run your scripts with the correct `NODE_ENV`:

- test: `cross-env NODE_ENV=test your_test_script`
- development: `cross-env NODE_ENV=development your_dev_script`
- production: `cross-env NODE_ENV=production your_prod_script`

**Note**: [`cross-env`](https://www.npmjs.com/package/cross-env) is an npm package that you need to install.

## Modifying the config

To change the config use the following pattern:

.terserrc.js

```js
const TerserAtomic = require("terser-config-atomic")

module.exports = {
  ...TerserAtomic,
  // your config here
}
```

To change the deep properties such as `compress`, use the following pattern as an example:

```js
const TerserAtomic = require("terser-config-atomic")

module.exports = {
  ...TerserAtomic,
  compress: {
    ...TerserAtomic.compress,
    ecma: 2020,
  },
}
```
