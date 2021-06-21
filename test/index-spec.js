describe("Terser-Config-Atomic", () => {
  it("production", () => {
    process.env.NODE_ENV = "production"

    const TerserOptions = require("../src/.terserrc")

    expect(typeof TerserOptions).toBe("object")
    expect(TerserOptions.compress.global_defs).toEqual({
      "@atom.inSpecMode": "() => false",
      "@atom.inDevMode": "() => false",
    })
    expect(TerserOptions.compress.passes).toBe(3)
    expect(TerserOptions.mangle).toBeTrue()
    expect(TerserOptions.format.beautify).toBeFalse()
  })
})
