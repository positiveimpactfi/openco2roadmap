/** Returns a copy of the object but with undefined fields stripped */
export const truthyObject = <T extends Object>(object: T) => {
  return JSON.parse(JSON.stringify(object));
};
