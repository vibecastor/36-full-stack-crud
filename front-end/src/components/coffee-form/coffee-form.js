import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../utils';

const defaultState = {
  brand: '',
  origin: '',
  error: null,
};

export default class CoffeeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.coffee ? props.coffee : defaultState;
    autoBind.call(this, CoffeeForm);
  }

  componentDidUpdate(previousProps) {
    if (previousProps.coffee !== this.props.coffee) {
      this.setState(this.props.coffee);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { onComplete } = this.props;
    const result = onComplete(this.state);
    if (result instanceof Promise) {
      result
        .then(() => {
          this.setState(defaultState);
        })
        .catch((error) => {
          console.error('COFFEE FORM ERROR: ', error);
          this.setState({ error });
        });
    }
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ [event.target.value]: event.target.value });
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className="coffee-form"
      >
        <input
          name="brand"
          type="text"
          placeholder="Enter a coffee brand"
          value={this.state.brand}
          onChange={this.handleChange}
        />
        <input
          name="origin"
          type="text"
          placeholder="Enter a coffee origin"
          value={this.state.origin}
          onChange={this.handleChange}
        />
        <button type="submit">{this.props.buttonText}</button>
      </form>
    );
  }
}

CoffeeForm.propTypes = {
  onComplete: PropTypes.func,
  coffee: PropTypes.object,
  buttonText: PropTypes.string,
};
