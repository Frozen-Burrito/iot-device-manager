import React, { Component } from 'react';
import axios from 'axios';
import { Spinner, Row } from 'react-bootstrap';
import { DeviceCard } from '../components/DeviceCard';
import { DeviceFilter } from '../components/DeviceFilter';
import { CustomModal } from '../components/CustomModal';

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
      displayDeleteModal: false,
      selectedDeviceId: '',

      loading: false 
    };

    this.renderThingCollection = this.renderThingCollection.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleLayoutToggle = this.handleLayoutToggle.bind(this);

    this.handleDeleteModalDisplay = this.handleDeleteModalDisplay.bind(this);
    this.handleDeleteModalAccept = this.handleDeleteModalAccept.bind(this);
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

  handleDeleteModalDisplay(show, identifier = '') {
		this.setState((state, _) => ({
      selectedDeviceId: identifier,
			displayDeleteModal: show
		}));
	}

	async handleDeleteModalAccept() {
		console.log('Removal was confirmed.');
    const { selectedDeviceId: identifier } = this.state;

		this.handleDeleteModalDisplay(false);

		try {
			await axios.delete(`api/things/${identifier}`);
      
      this.setState((state, _) => ({
        things: state.things.filter(thing => thing.identifier !== identifier)
      }));

		} catch (error) {
			console.log('Can\'t delete, an error was raised: ', error);
		}
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
          <DeviceCard 
            key={ thing.identifier } 
            thing={ thing } 
            onDeleteAction={ () => this.handleDeleteModalDisplay(true, thing.identifier) }/>
        )}
      </Row>
    );
  }

  render() {

    const { loading, filters, displayDeleteModal, things } = this.state;

    const selectedDevice = 
      things.find(t => t.identifier === this.state.selectedDeviceId);

    const deleteModalData = {
			title: `Remove ${selectedDevice ? selectedDevice.name : 'unknown device'}?`,
			body: 'If you confirm this action, the device will be deleted permanently from the collection.',
			action: 'Remove',
			actionColor: 'danger',
		}

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

        <CustomModal
          show={ displayDeleteModal }
          data={ deleteModalData }
          onAcceptModal={ this.handleDeleteModalAccept } 
					onCloseModal={ () => this.handleDeleteModalDisplay(false) }
        />
      </div>
    );
  }
}
