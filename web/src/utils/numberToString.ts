export const numberToString = (x: number, precision: number = 2): string => {
  if (Math.abs(x) < 1.0) {
    if (x === 0) return "0";

    const numToExp = x.toExponential(2);
    const exp = parseInt(numToExp.toString().split("e-")[1]);
    if (exp > 3 && exp <= 5) return numToExp;

    let e = parseInt(x.toString().split("e-")[1]);
    if (e) {
      return (
        parseFloat(
          parseFloat(x.toString().split("e-")[0]).toFixed(precision)
        ).toLocaleString() +
        "e-" +
        e
      );
    }
  } else {
    let e = parseInt(x.toString().split("e+")[1]);
    if (e) {
      return (
        parseFloat(
          parseFloat(x.toString().split("e+")[0]).toFixed(precision)
        ).toLocaleString() +
        "e-" +
        e
      );
    }
  }
  return parseFloat(x.toFixed(precision)).toLocaleString();
};
