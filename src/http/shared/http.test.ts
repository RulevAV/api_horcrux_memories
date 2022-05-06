import { buildQs } from "./index"


describe("buildQs", () => {
  it("null", () => {
    buildQs("", {})
  })
  it("muss", () => {
    buildQs("", { mass: ["1", "2"] })
  })
})