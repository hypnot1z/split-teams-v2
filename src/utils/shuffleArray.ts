function shuffleArray(array: Number[]) {
  array.sort(() => Math.random() - 0.5)
}

export default shuffleArray