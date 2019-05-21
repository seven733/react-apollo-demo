
import { action } from 'easy-peasy';

export default {
  query: {
    data: {},
    changeQuery: action((state, payload) => {
      state.data = Object.assign(state.data, payload)
    })
  }
}