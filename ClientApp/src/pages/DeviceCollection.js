import React, { Component } from 'react';
import axios from 'axios';
import { Spinner, Row } from 'react-bootstrap';
import { DeviceCard } from '../components/DeviceCard';
import { DeviceFilter } from '../components/DeviceFilter';

export class DeviceCollection extends Component {
  static displayName = DeviceCollection.name;

  constructor(props) {
    super(props);
    this.state = { 
      things: [],

      filters: {
        searchQuery: '',
        isGridView: true, 
      },

      loading: false 
    };

    this.renderThingCollection = this.renderThingCollection.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleLayoutToggle = this.handleLayoutToggle.bind(this);
  }

  componentDidMount() {
    this.populateThingData();
  }

  async populateThingData() {
    const response = await axios.get('api/things');
    this.setState({ 
      things: response.data, 
      loading: false 
    });
  }

  handleQueryChange(queryStr) {
    this.setState((state, _) => ({ 
      filters: { 
        ...state.filters,
        searchQuery: queryStr 
    }}));
  }

  handleLayoutToggle() {
    this.setState((state, props) => ({
      filters: {
        ...state.filters,
        isGridView: !state.filters.isGridView
      }
    }));
  }

  renderThingCollection() {

    const { 
      things: thingCollection, 
      filters: { searchQuery, isGridView }, 
    } = this.state;

    const searchRegEx = new RegExp(searchQuery, "i");
    const filteredList = searchQuery.length > 0 
      ? thingCollection.filter(thing => thing.name.search(searchRegEx) >= 0)
      : thingCollection;

    return (
      <Row xs={1} md={ isGridView ? 3 : 1 } className="g-3">
        {filteredList.map(thing =>
          <DeviceCard key={ thing.identifier } thing={ thing } />
        )}
      </Row>
    );
  }

  render() {

    const { loading, filters } = this.state;

    let content = loading
      ? <Spinner color="dark" />
      : this.renderThingCollection();

    return (
      <div>
        <h1>Your Things</h1>
        <p>Here you can view, edit and manage all your intelligent devices.</p>

        <DeviceFilter 
          filters={filters} 
          onQueryChange={this.handleQueryChange}
          onLayoutToggle={this.handleLayoutToggle}/>

        <hr/>  

        {content}
      </div>
    );
  }
}
