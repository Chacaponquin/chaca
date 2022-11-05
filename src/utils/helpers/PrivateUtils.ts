export class PrivateUtils {
  static intNumber({ min, max }: { min?: number; max?: number }) {
    const minimun: number | undefined =
      typeof min === "number" ? min : undefined;
    let maximun: number | undefined;

    if (typeof max === "number") {
      if (minimun) {
        if (max > minimun) maximun = max;
        else maximun = undefined;
      } else maximun = max;
    } else maximun = undefined;

    let delta: number;
    if (minimun && maximun) {
      delta = maximun - minimun;
    }
  }
}
