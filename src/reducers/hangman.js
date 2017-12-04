import {
  USER_CHOSE_LETTER,
  RESTART,
  getWord,
} from '../actions/hangman'

const initialState = {
  word: getWord(),
  chose: [],
  wrong: 0,
  maxTries: 8,
};

export default function hangman(state = initialState, action) {
  switch (action.type) {
    case USER_CHOSE_LETTER:
      const newChose = state.chose.slice()
      newChose.push(action.letter)

      return Object.assign({}, state, {
        chose: newChose,
        wrong: state.wrong + ( action.wrong ? 1 : 0 ) 
      });
    case RESTART:
      return {
        word: action.word,
        chose: [],
        wrong: 0,
        maxTries: 7,
      };
    default:
      return state;
  }
}
