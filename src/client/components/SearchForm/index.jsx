import React from "react";

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.handleOnKeyUp = this.handleOnKeyUp.bind(this);

    this.onSubmit = this.props.onSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({ [name]: value });
  }

  handleOnBlur(event) {
    if (event.target.value !== "") {
      this.handleSubmit(event);
    }
  }

  handleOnKeyUp(event) {
    if (event.which == 13) {
      this.handleOnBlur(event);
    }
  }

  handleSubmit(event) {
    //alert('This is where we will fetch results!');
    this.onSubmit({ query: event.target.value });

    const name = event.target.name;
    this.setState({ [name]: "" });

    event.preventDefault();
  }

  render() {
    return (
      <div className="SearchForm">
        <input
          type="text"
          name="color"
          value={this.state.color}
          onChange={this.handleInputChange}
          onBlur={this.handleOnBlur}
          onKeyUp={this.handleOnKeyUp}
          placeholder="Name or Number"
          autoComplete="off"
        />
      </div>
    );
  }
}

export default SearchForm;
