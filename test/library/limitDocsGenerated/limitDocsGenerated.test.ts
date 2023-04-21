import { COMPLETE_SCHEMA } from "../utils/schemas/simple/schemaComplete";

const MINIMUN_FOR_TEST = 5000;
const MEDIUM_FOR_TEST = 20000;
const MAXIMUN_FOR_TEST = 40000;

describe("# Limite Docs Generated Test", () => {
  for (let i = 0; i <= MINIMUN_FOR_TEST; i += 500) {
    it(`${i} documents`, () => {
      const cantDoc = i;
      expect(COMPLETE_SCHEMA.generate(cantDoc).length).toBe(cantDoc);
    });
  }
});
