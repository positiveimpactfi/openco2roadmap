export const numberToString = (x: number): string => {
  if (Math.abs(x) < 1.0) {
    if (x === 0) return "0";

    const numToExp = x.toExponential(2);
    const exp = parseInt(numToExp.toLocaleString().split("e-")[1]);
    if (exp > 3 && exp <= 5) return numToExp;

    let e = parseInt(x.toLocaleString().split("e-")[1]);
    if (e) {
      return (
        parseFloat(x.toLocaleString().split("e-")[0]).toFixed(2) + "e-" + e
      );
    }
  } else {
    let e = parseInt(x.toLocaleString().split("e+")[1]);
    if (e) {
      return (
        parseFloat(x.toLocaleString().split("e+")[0]).toFixed(2) + "e-" + e
      );
    }
  }
  return x.toLocaleString();
};
