const pickColorer = (code) => {
  switch (code) {
    case 'X':
      return 'none'
    case 'W':
      return 'rgba(0, 255, 0, .75)'
    case 'L':
      return 'rgba(255, 0, 0, .75)'
    case 'T':
      return 'rgba(255, 255, 0, .75)'
  }
}

export default pickColorer