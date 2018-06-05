import superagent from 'superagent';

const coffeesFetch = coffees => ({
  type: 'COFFEES_FETCH',
  payload: coffees,
});

const coffeeCreate = coffee => ({
  type: 'COFFEE_CREATE',
  payload: coffee,
});

const coffeeUpdate = coffee => ({
  type: 'COFFEE_UPDATE',
  payload: coffee,
});

const coffeeDelete = coffee => ({
  type: 'COFFEE_DELETE',
  payload: coffee,
});

const coffeesFetchRequest = () => (dispatch) => {
  return superagent.get(`${API_URL}/api/coffee`)
    .then((response) => {
      dispatch(coffeesFetch(response.body));
      return response;
    });
};

const coffeeCreateRequest = todo => (dispatch) => {
  return superagent.post(`${API_URL}/api/coffee`)
    .send(todo)
    .then((response) => {
      dispatch(coffeeCreate(response.body));
      return response;
    });
};

const coffeeDeleteRequest = todo => (dispatch) => {
  return superagent.delete(`${API_URL}/api/coffee/${coffee._id}`)
    .then((response) => {
      dispatch(coffeeDelete(todo));
      return response;
    });
};

export { coffeesFetchRequest, coffeeCreateRequest, coffeeUpdate, coffeeDeleteRequest };
