import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col, Stack, Badge, Button, Container, Tabs, Tab } from 'react-bootstrap';

import { CustomModal } from '../components/CustomModal';
import { NewVarForm } from '../components/NewVarForm';
import { VariableList } from '../components/VariableList';

export class DeviceDetails extends Component {
	static displayName = DeviceDetails.name;

	constructor(props) {
		super(props);
		this.state = {
			thing: {},
			newVariable: {
				name: '',
				type: 0,
			},
			showDeleteModal: false,
			showNewVarModal: false,
			loading: true,
			error: null
		}

		// Details section
		this.getThingDetails = this.getThingDetails.bind(this);
		this.renderThingDetails = this.renderThingDetails.bind(this);

		// Delete functionality
		this.handleDeleteModalDisplay = this.handleDeleteModalDisplay.bind(this);
		this.handleDeleteModalAccept = this.handleDeleteModalAccept.bind(this);

		// Create variable
		this.handleNewVarModalDisplay = this.handleNewVarModalDisplay.bind(this);
		this.handleNewVarModalConfirm = this.handleNewVarModalConfirm.bind(this);
		this.handleVariableFormChange = this.handleVariableFormChange.bind(this);
		
		// Delete variable
		this.handleVarDelete = this.handleVarDelete.bind(this);
	}

	componentDidMount() {
		const { identifier } = this.props.match.params;
		this.getThingDetails(identifier);
	}

	async getThingDetails(deviceIdentifier) {
		this.setState({ loading: true });

		try {
			if (!deviceIdentifier || deviceIdentifier === '')
				throw new Error('No device identifier provided.');

			const response = await axios.get(`api/things/${deviceIdentifier}`);
			
			this.setState({
				thing: response.data,
				loading: false
			});

		} catch (e) {
			this.setState({
				error: e.Message
			});
		}
	}

	renderThingDetails() {
		const { thing } = this.state;

		const deviceTags = (
			<Stack direction="horizontal" gap={1}>
				<i className="bi bi-tags me-1"></i>
				{thing.labels.split(', ').map(label => 
					<Badge key={label} bg="info">
						{ label.replace(/^\w/, (c) => c.toUpperCase()) }
					</Badge>
				)}
			</Stack>
		);
		
		return (
			<Row>
				<Col md={7}>
					<Stack direction="vertical" gap={2}>
						<h3 className="mb-0 display-6 fs-4 text-muted">{thing.identifier}</h3>
						<h1>{thing.name}</h1>

						{ deviceTags }

						<p className="text-muted">
							<i className="bi bi-globe me-1"></i>
							{ thing.ipAddress }
						</p>

						<p className="text-muted">{ thing.shortDescription }</p>
					</Stack>
				</Col>

				<Col>
					<Stack direction="horizontal" gap={2}>
						<Button variant="light" className="ms-auto">
							<i className="bi bi-sliders"></i>
						</Button>

						<Button variant="danger" onClick={ e => this.handleDeleteModalDisplay(true) }>
							<i className="bi bi-x"></i>
							Remove Device
						</Button>
					</Stack>
				</Col>
			</Row>
		);
	}

	handleDeleteModalDisplay(show) {
		this.setState((state, _) => ({
			showDeleteModal: show
		}));
	}

	async handleDeleteModalAccept() {
		console.log('Removal was confirmed.');
		const { identifier } = this.state.thing;

		this.handleDeleteModalDisplay(false);

		try {
			await axios.delete(`api/things/${identifier}`);
			this.props.history.push('/devices');

		} catch (error) {
			console.log('Can\'t delete, an error was raised: ', error);
		}
	}

	handleNewVarModalDisplay(show) {
		this.setState((state, _) => ({
			showNewVarModal: show
		}));
	}

	async handleNewVarModalConfirm() 
	{
		console.log('Adding a new variable...');
		const { thing: { identifier}, newVariable } = this.state;

		const variableData = {
			ThingId: identifier,
			Name: newVariable.name,
			Type: Number(newVariable.type)
		}

		try {
			console.log(variableData);

			await axios.post('api/variables', variableData);

			this.setState({
				newVariable: {
					name: '',
					type: 0
				}
			});

			this.handleNewVarModalDisplay(false);

		} catch (error) {
			console.log('Can\'t delete, an error was raised: ', error);
		}
	}

	handleVariableFormChange(key, value) {
		this.setState((state, _) => ({
			newVariable: {
				...state.newVariable,
				[key]: value
			}
		}));
	}

	async handleVarDelete(variableId) {
		try {
			await axios.delete(`api/variables/${variableId}`);

		} catch (error) {
			console.log('Can\'t delete, an error was raised: ', error);
		}
	}

	render() {

		const { 
			loading, 
			showDeleteModal, 
			showNewVarModal } = this.state;

		const { identifier: thingId } = this.props.match.params;

		const deleteModalData = {
			title: `Remove ${this.state.thing.name}?`,
			body: 'If you confirm this action, the device will be deleted permanently from the collection.',
			action: 'Remove',
			actionColor: 'danger',
		}

		const newVarModalData = {
			title: 'New Variable',
			body: 'Assign a new variable to this device.',
			action: 'Save',
			actionColor: 'primary',
		}

		let thingDetails = loading 
			? <h1>Loading</h1>
			: this.renderThingDetails();

		return (
			<Container>
				<div className="mt-4">
					{ thingDetails }

					<Tabs defaultActiveKey="variables" id="device-tabs" className="my-3">
						<Tab eventKey="data" title="Data">
							<div className="text-center my-5">
								<i className="bi bi-cloud-lightning fs-2"></i>
								<p className="fs-5">There is no data available right now.</p>
							</div>
						</Tab>

						<Tab eventKey="variables" title="Variables">
							<VariableList 
								thingId={ thingId }
								onNewVariable={ () => this.handleNewVarModalDisplay(true) }
								onVariableDelete={ this.handleVarDelete } />
						</Tab>
					</Tabs>

					<CustomModal 
						show={ showDeleteModal } 
						data={ deleteModalData } 
						onAcceptModal={ this.handleDeleteModalAccept } 
						onCloseModal={ () => this.handleDeleteModalDisplay(false) }/>

					<CustomModal 
						show={ showNewVarModal } 
						data={ newVarModalData } 
						onAcceptModal={ this.handleNewVarModalConfirm } 
						onCloseModal={ () => this.handleNewVarModalDisplay(false) }>
							<NewVarForm 
								onFormChange={ this.handleVariableFormChange } 
								value={ this.state.newVariable }/>
					</CustomModal>
				</div>
			</Container>
		);
	}
}