
import { action } from 'easy-peasy';

export default {
  query: {
    data: {},
    assign: action((state, payload) => {
      state.data = Object.assign(state.data, payload)
    })
  },
  user: {
    data: null,
    // data: { name: 'jack' },
    set: action((state, payload) => {
      state.data = payload
    })
  }
}