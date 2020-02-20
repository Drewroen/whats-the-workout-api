function isPrime(num) {
    for (var i = 2; i < num; i++) if (num % i === 0) return false;
    return num !== 1;
  }
  
  describe("test prime number", () => {
    it("17 is a prime number", () => {
      expect(isPrime(17)).toBe(true);
    });
  });