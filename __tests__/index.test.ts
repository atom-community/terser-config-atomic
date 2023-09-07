import assert from "assert"
import { getTerserOptions } from "../src/get-terserrc"

describe("Terser-Config-Atomic", () => {
  it("production", () => {
    const TerserOptions = getTerserOptions("production", undefined)

    expect(typeof TerserOptions).toBe("object")
    assert(typeof TerserOptions.compress === "object")
    expect(TerserOptions.compress.global_defs).toEqual({
      "process.env.NODE_ENV": "production",
      "process.env.BABEL_ENV": "production",
      "@atom.inSpecMode": "() => false",
      "@atom.inDevMode": "() => false",
    })
    expect(TerserOptions.compress.passes).toBe(3)
    expect(TerserOptions.mangle).toBe(true)
    expect(TerserOptions.format.beautify).toBe(false)
  })
  it("development", () => {
    process.env.NODE_ENV = "development"

    const TerserOptions = getTerserOptions("development", undefined)

    expect(typeof TerserOptions).toBe("object")
    expect(TerserOptions.compress).toBe(false)
    expect(TerserOptions.mangle).toBe(false)
    expect(TerserOptions.format.beautify).toBe(true)
  })
  it("test", () => {
    process.env.NODE_ENV = "test"

    const TerserOptions = getTerserOptions("test", undefined)

    expect(typeof TerserOptions).toBe("object")
    assert(typeof TerserOptions.compress === "object")
    expect(TerserOptions.compress.global_defs).toEqual({
      "process.env.NODE_ENV": "test",
      "process.env.BABEL_ENV": "test",
      "@atom.inSpecMode": "() => true",
      "@atom.inDevMode": "() => false",
    })
    expect(TerserOptions.compress.passes).toBe(3)
    expect(TerserOptions.mangle).toBe(false)
    expect(TerserOptions.format.beautify).toBe(true)
  })
})
