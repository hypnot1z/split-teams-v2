function createArrayFromZeroToN(N: number): number[] {
  return Array.from({ length: N }, (_, index) => index);
}

export default createArrayFromZeroToN;
