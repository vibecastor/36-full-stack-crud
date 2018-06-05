import { validateTodo } from '../utils';

const emptyState = [];

export default (state = emptyState, { type, payload }) => {
  switch (type) {
    case 'COFFEES_FETCH':
      return payload;
    case 'COFFEE_CREATE':
      validateTodo(payload);
      return [payload, ...state];
    case 'COFFEE_UPDATE':
      validateTodo(payload);
      return state.map(item => (item._id === payload._id ? payload : item));
    case 'COFFEE_DELETE':
      validateTodo(payload);
      return state.filter(item => item._id !== payload._id);
    default:
      return state;
  }
};
