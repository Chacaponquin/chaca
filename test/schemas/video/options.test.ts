import { schemas } from "../../../src";

describe("# Video schema tests", () => {
  it("Animal test", () => {
    const value = schemas.video.animal().getValue();
    expect(schemas.video.constants.animal.includes(value));

    schemas.address.country();
  });

  it("Architecture test", () => {
    const value = schemas.video.architecture().getValue();
    expect(schemas.video.constants.architecture.includes(value));
  });

  it("Art test", () => {
    const value = schemas.video.art().getValue();
    expect(schemas.video.constants.art.includes(value));
  });

  it("3D test", () => {
    const value = schemas.video.threeDimension().getValue();
    expect(schemas.video.constants["3d"].includes(value));
  });

  it("Event test", () => {
    const value = schemas.video.event().getValue();
    expect(schemas.video.constants.event.includes(value));
  });

  it("Experimental test", () => {
    const value = schemas.video.experimental().getValue();
    expect(schemas.video.constants.experimental.includes(value));
  });

  it("Fashion test", () => {
    const value = schemas.video.fashion().getValue();
    expect(schemas.video.constants.fashion.includes(value));
  });

  it("Food test", () => {
    const value = schemas.video.food().getValue();
    expect(schemas.video.constants.food.includes(value));
  });

  it("Health test", () => {
    const value = schemas.video.health().getValue();
    expect(schemas.video.constants.health.includes(value));
  });

  it("History test", () => {
    const value = schemas.video.history().getValue();
    expect(schemas.video.constants.history.includes(value));
  });

  it("Nature test", () => {
    const value = schemas.video.nature().getValue();
    expect(schemas.video.constants.nature.includes(value));
  });

  it("People test", () => {
    const value = schemas.video.people().getValue();
    expect(schemas.video.constants.people.includes(value));
  });

  it("Spiritual test", () => {
    const value = schemas.video.spiritual().getValue();
    expect(schemas.video.constants.spirituality.includes(value));
  });

  it("Sport test", () => {
    const value = schemas.video.sport().getValue();
    expect(schemas.video.constants.sport.includes(value));
  });

  it("Street test", () => {
    const value = schemas.video.street().getValue();
    expect(schemas.video.constants.street.includes(value));
  });

  it("Travel test", () => {
    const value = schemas.video.travel().getValue();
    expect(schemas.video.constants.travel.includes(value));
  });

  it("Wallpaper test", () => {
    const value = schemas.video.wallpaper().getValue();
    expect(schemas.video.constants.wallpaper.includes(value));
  });
});
