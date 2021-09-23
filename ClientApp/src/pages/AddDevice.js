import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

export class AddDevice extends Component {
  static displayName = AddDevice.name;

  constructor(props) {
    super(props);
    this.state = { 
      device: {
        identifier: 'some-identifier',
        name: '',
        labels: '',
        shortDescription: '',
        type: 0,
        ipAddress: ''
      }, 
      charLengths: {
        name: 50,
        shortDescription: 300
      },
      loading: false 
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderAddForm = this.renderAddForm.bind(this);
  }

  // componentDidMount() {
  //   this.populateThingData();
  // }

  handleChange(e)
  {
    const { target } = e;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      device: {
        ...this.state.device,
        [name]: value
      }
    });
  }

  async handleSubmit(e)
  {
    e.preventDefault();
    console.log(this.state.device);
    await axios.post('api/things', this.state.device);

    this.props.history.push('/devices');
  }

  renderAddForm() {

    const deviceTypes = [ "light", "sensor", "device", "panel" ];

    return (
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Identifier</Form.Label>
          <Form.Control 
            type="text" 
            name="identifier"
            aria-describedby="idHelp"
            value={ this.state.device.identifier } 
            onChange={ e => this.handleChange(e) }/>

            <Form.Text id="idHelp" muted>
              A unique string of characters that identifies the device. If not assigned, a random unique id is created.
            </Form.Text>
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Device Name</Form.Label>
          <Form.Control 
            type="text" 
            name="name"
            aria-describedby="nameHelp"
            value={ this.state.device.name } 
            onChange={ e => this.handleChange(e) }/>

            <Form.Text id="nameHelp" muted>
              {this.state.charLengths.name - this.state.device.name.length } characters remaining.
            </Form.Text>
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>IP Address</Form.Label>
          <Form.Control 
            type="text" 
            name="ipAddress"
            placeholder="0.0.0.0"
            value={ this.state.device.ipAddress } 
            onChange={ e => this.handleChange(e) }/>
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control 
            as="textarea" 
            name="shortDescription"
            aria-describedby="descHelp"
            value={ this.state.device.shortDescription }
            onChange={ e => this.handleChange(e) }/>

          <Form.Text id="descHelp" muted>
              {this.state.charLengths.shortDescription - this.state.device.shortDescription.length } characters remaining.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Type of Device</Form.Label>
          <Form.Select aria-label="Select the type of device">
            <option>None</option>
            { deviceTypes.map((deviceType, i) => 
              <option value={i}>
                { deviceType.replace(/^\w/, (c) => c.toUpperCase()) }
              </option>
            )}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Tags</Form.Label>
          <Form.Control 
            type="text" 
            name="labels"
            placeholder="Sensor, Light, ..."
            value={ this.state.device.lables } 
            onChange={ e => this.handleChange(e) }/>
        </Form.Group>

        <Button color="primary" onClick={this.handleSubmit}>Save</Button>
      </Form>
    );
  }

  render() {
    let content = this.renderAddForm();

    return (
      <div>
        <h1 id="tabelLabel">Add a Device</h1>
        <p>Specify the details of the device and click 'Save'.</p>
        { content }
      </div>
    );
  }

  // async populateThingData() {
  //   const response = await fetch('api/things');
  //   const data = await response.json();
  //   this.setState({ things: data, loading: false });
  // }
}
