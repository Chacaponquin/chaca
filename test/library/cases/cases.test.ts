import { BASEBALL_CASE_DATA } from "../utils/cases/baseball";

describe("# Cases Test", () => {
  it("Baseball case", () => {
    expect(BASEBALL_CASE_DATA).toHaveProperty("Game");
    expect(BASEBALL_CASE_DATA).toHaveProperty("Phase");
    expect(BASEBALL_CASE_DATA).toHaveProperty("Stadium");
    expect(BASEBALL_CASE_DATA).toHaveProperty("Team");
    expect(BASEBALL_CASE_DATA).toHaveProperty("TeamMember");
    expect(BASEBALL_CASE_DATA).toHaveProperty("Player");
    expect(BASEBALL_CASE_DATA).toHaveProperty("Coach");
    expect(BASEBALL_CASE_DATA).toHaveProperty("Pitcher");
    expect(BASEBALL_CASE_DATA).toHaveProperty("Batter");
  });
});
