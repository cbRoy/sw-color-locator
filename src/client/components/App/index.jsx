import React from "react";
import { hot } from "react-hot-loader";
import { SearchForm } from "..";
import ColorCard from "../pagedraw/colorcard";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { results: [] };
  }

  onSubmit(data) {
    fetch("./colors/" + data.query)
      .then(res => res.json())
      .then(data => this.setState({ results: data.results }));
  }

  render() {
    return (
      <div className="App">
        <h1>Search Colors!</h1>
        <div id="search-container">
          <SearchForm onSubmit={this.onSubmit.bind(this)} />
        </div>
        <ColorList colors={this.state.results} />
      </div>
    );
  }
}

const ColorList = ({ colors }) => {
  const colorNodes = colors.map((color, index) => {
    return (
      <li key={index}>
        <ColorCard
          name={color.name}
          number={color.number}
          locator={color.locator}
          color={color.color}
        />
      </li>
    );
  });
  return (
    <div className="results">
      <ul>{colorNodes}</ul>
    </div>
  );
};

export default hot(module)(App);
