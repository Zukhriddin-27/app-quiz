import {
  CHANGE_DIFFICULTY,
  CHANGE_CATEGORY,
  CHANGE_TYPE,
  CHANGE_SCORE,
  CHANGE_AMOUNT,
} from './actionTypes'
const initialState = {
  question_category: '',
  question_diffucult: '',
  question_type: '',
  amount_of_question: 50,
  score: 0,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CATEGORY:
      return {
        ...state,
        question_category: action.payload,
      }
    case CHANGE_DIFFICULTY:
      return {
        ...state,
        question_diffucult: action.payload,
      }
    case CHANGE_TYPE:
      return {
        ...state,
        question_type: action.payload,
      }
    case CHANGE_SCORE:
      return {
        ...state,
        score: action.payload,
      }
    case CHANGE_AMOUNT:
      return {
        ...state,
        amount_of_question: action.payload,
      }

    default:
      return state
  }
}

export default reducer
