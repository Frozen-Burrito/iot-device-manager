import React, { Component } from 'react';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { things: [], loading: true };
  }

  componentDidMount() {
    this.populateThingData();
  }

  static renderThingsTable(things) {
    console.log(things);
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Identifier</th>
            <th>Device Name</th>
            <th>Labels</th>
            <th>IP Address</th>
          </tr>
        </thead>
        <tbody>
          {things.map(thing =>
            <tr key={thing.identifier}>
              <td>{thing.identifier}</td>
              <td>{thing.name}</td>
              <td>{thing.labels}</td>
              <td>{thing.ipAddress}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderThingsTable(this.state.things);

    return (
      <div>
        <h1 id="tabelLabel" >Your Things</h1>
        <p>This component fetches all tracked intelligent devices.</p>
        {contents}
      </div>
    );
  }

  async populateThingData() {
    const response = await fetch('api/things');
    const data = await response.json();
    this.setState({ things: data, loading: false });
  }
}
