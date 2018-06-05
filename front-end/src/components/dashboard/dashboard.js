import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CoffeeForm from '../coffee-form/coffee-form';
import * as coffeeActions from '../../actions/coffee-actions';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.coffeesFetch();
  }

  render() {
    const { coffees, coffeeCreate, coffeeDelete } = this.props;
    return (
      <div className="dashboard">
        <h2>Coffee App</h2>
        <CoffeeForm
          onComplete={coffeeCreate}
          buttonText="Create Coffee"
        />
        {
          coffees.map((coffee) => {
            return (
              <div key={coffee._id}>
                <p>{coffee.brand}</p>
                <button onClick={() => coffeeDelete(coffee)}>X</button>
              </div>
            );
          })
        }
      </div>
    );
  }
}

Dashboard.propTypes = {
  coffeesFetch: PropTypes.func,
  coffeeCreate: PropTypes.func,
  coffeeDelete: PropTypes.func,
  coffees: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    coffees: state.coffees,
  };
};

const mapDispatchToProps = dispatch => ({
  coffeesFetch: () => dispatch(coffeeActions.coffeesFetchRequest()),
  coffeeCreate: coffee => dispatch(coffeeActions.coffeeCreateRequest(coffee)),
  coffeeDelete: coffee => dispatch(coffeeActions.coffeeDeleteRequest(coffee)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
