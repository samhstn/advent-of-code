function unique(str) {
  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j < str.length; j++) {
      if (str[i] == str[j]) {
        return false
      }
    }
  }
  return true
}

export function p1(input) {
  for (let i = 4; i < input.length; i++) {
    if (unique(input.substring(i - 4, i))) {
      return i
    }
  }
}

export function p2(input) {
  for (let i = 14; i < input.length; i++) {
    if (unique(input.substring(i - 14, i))) {
      return i
    }
  }
}
