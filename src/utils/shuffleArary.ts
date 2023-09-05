function shuffleArray<T>(array: T[]): T[] {
    const arrayDeepCopy = JSON.parse(JSON.stringify(array));
  
    for (let index = arrayDeepCopy.length - 1; index > 0; index--) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [arrayDeepCopy[index], arrayDeepCopy[randomIndex]] = [
        arrayDeepCopy[randomIndex],
        arrayDeepCopy[index],
      ];
    }
    return arrayDeepCopy;
  }

  export default shuffleArray