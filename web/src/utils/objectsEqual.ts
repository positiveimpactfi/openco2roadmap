export const shallowObjectsEqual = <T>(objectA: T, objectB: T): boolean => {
  const keysA = Object.keys(objectA);
  const keysB = Object.keys(objectB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (let key of keysA) {
    if (objectA[key] !== objectB[key]) {
      return false;
    }
  }

  return true;
};

export const deepObjectsEqual = <T>(objectA: T, objectB: T): boolean => {
  const stringA = JSON.stringify(objectA);
  const stringB = JSON.stringify(objectB);
  return stringA === stringB;
};
