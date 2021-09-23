import axios from 'axios';
import React, { Component } from 'react';
import { Row, Col, Stack, Badge, Button } from 'react-bootstrap';

import { CustomModal } from '../components/CustomModal';

export class DeviceDetails extends Component {
	static displayName = DeviceDetails.name;

	constructor(props) {
		super(props);
		this.state = {
			thing: {},
			showDeleteModal: false,
			loading: true,
			error: null
		}

		this.renderThingDetails = this.renderThingDetails.bind(this);
		this.handleDeleteModalDisplay = this.handleDeleteModalDisplay.bind(this);
		this.handleDeleteModalAccept = this.handleDeleteModalAccept.bind(this);
	}

	componentDidMount() {
		const { identifier } = this.props.match.params;
		this.getThingDetails(identifier);
	}

	async getThingDetails(deviceIdentifier) {
		try {
			if (!deviceIdentifier || deviceIdentifier === '')
				throw new Error('No device identifier provided.');

			const response = await axios.get(`api/things/${deviceIdentifier}`);
			console.log(response);
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

				<hr/>
			</Row>
		);
	}

	handleDeleteModalDisplay(show) {
		this.setState((state, _) => ({
			showDeleteModal: show
		}));
	}

	handleDeleteModalAccept() {
		console.log('Removal was confirmed.');
		this.handleDeleteModalDisplay(false);
	}

	render() {

		const { loading, showDeleteModal } = this.state;

		const deleteModalData = {
			title: `Remove ${this.state.thing.name}?`,
			body: 'If you confirm this action, the device will be deleted permanently from the collection.',
			action: 'Remove',
			actionColor: 'danger',
		}

		let thingDetails = loading 
			? <h1>Loading</h1>
			: this.renderThingDetails();

		return (
			<div className="mt-4">
				{ thingDetails }

				<div>
					<h3>Data</h3>

					<div className="text-center my-5">
						<i className="bi bi-cloud-lightning fs-2"></i>
						<p className="fs-5">There is no data available right now.</p>
					</div>
				</div>

				<CustomModal 
					show={ showDeleteModal } 
					data={ deleteModalData } 
					onAcceptModal={ this.handleDeleteModalAccept } 
					onCloseModal={ () => this.handleDeleteModalDisplay(false) }/>
			</div>
		);
	}
}