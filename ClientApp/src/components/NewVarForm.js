import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

export class NewVarForm extends Component {
  	static displayName = NewVarForm.name;

	handleChange(e)
  	{
		const { target } = e;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const { name } = target;

		this.props.onFormChange(name, value);
  	}

  	render() {
    	const varTypes = [ "number", "string", "boolean" ];

		const { value } = this.props;

      	return (
			<Form>
				<Form.Group className="mb-3">
				<Form.Label>Name</Form.Label>
				<Form.Control 
					type="text" 
					name="name"
					aria-describedby="nameHelp"
					value={ value.name } 
					onChange={ e => this.handleChange(e) }/>

					<Form.Text id="nameHelp" muted>
					Identifies the variable. This name is used when controlling the device.
					</Form.Text>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Type</Form.Label>
					<Form.Select 
						aria-label="Type of Variable"
						name="type"
						onChange={ e => this.handleChange(e) }>
						<option>None</option>
						{ varTypes.map((varType, i) => 
						<option key={varType} value={i}>
							{ varType.replace(/^\w/, (c) => c.toUpperCase()) }
						</option>
						)}
					</Form.Select>
				</Form.Group>
			</Form>
      	);
  	}
}