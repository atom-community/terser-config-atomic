const { requireFresh } = require("requirefresh")
const path = require("path")

const terserFile = path.join(path.dirname(__dirname), "src", ".terserrc.js")

describe("Terser-Config-Atomic", () => {
  it("production", () => {
    process.env.NODE_ENV = "production"

    const TerserOptions = requireFresh(terserFile)

    expect(typeof TerserOptions).toBe("object")
    expect(TerserOptions.compress.global_defs).toEqual({
      "@atom.inSpecMode": "() => false",
      "@atom.inDevMode": "() => false",
    })
    expect(TerserOptions.compress.passes).toBe(3)
    expect(TerserOptions.mangle).toBeTrue()
    expect(TerserOptions.format.beautify).toBeFalse()
  })
  it("development", () => {
    process.env.NODE_ENV = "development"

    const TerserOptions = requireFresh(terserFile)

    expect(typeof TerserOptions).toBe("object")
    expect(TerserOptions.compress).toBeFalse()
    expect(TerserOptions.mangle).toBeFalse()
    expect(TerserOptions.format.beautify).toBeTrue()
  })
  it("test", () => {
    process.env.NODE_ENV = "test"

    const TerserOptions = requireFresh(terserFile)

    expect(typeof TerserOptions).toBe("object")
    expect(TerserOptions.compress.global_defs).toEqual({
      "@atom.inSpecMode": "() => true",
      "@atom.inDevMode": "() => false",
    })
    expect(TerserOptions.compress.passes).toBe(3)
    expect(TerserOptions.mangle).toBeFalse()
    expect(TerserOptions.format.beautify).toBeTrue()
  })
})
