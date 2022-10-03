export class CHDataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CHDataError";
  }
}
