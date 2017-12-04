export const USER_CHOSE_LETTER = 'USER_CHOSE_LETTER'
export const RESTART = 'RESTART'


export const choseLetter = (letter) => (dispatch, getState) => {
  const { hangman } = getState()
  const { word, chose, maxTries, wrong } = hangman

  letter = letter.toUpperCase()


  if( !chose.includes(letter) && (maxTries - wrong) > 0 ) {
    return dispatch({
      type: USER_CHOSE_LETTER,
      letter,
      wrong: !word.includes(letter)
    })
  }
}

export const restart = () =>  {
  return {
    type: RESTART,
    word: getWord()
  }
}

export const getWord = () => {
  const words = ["wisdom", "mythology", "skeptical", "archaic", "asteroid"]
  return words[getRandomInt(0, words.length - 1)].toUpperCase()
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
