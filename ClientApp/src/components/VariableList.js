import React, { Component } from 'react';
import axios from 'axios';
import { Button, Spinner, ListGroup, Alert, Stack } from 'react-bootstrap';

export class VariableList extends Component {
    static displayName = VariableList.name;

    constructor(props) {
        super(props);

        this.state = {
            variables: [],
            loading: true,
            error: null
        }

        this.getVariablesAsync = this.getVariablesAsync.bind(this);

        this.handleNewVariableClick = this.handleNewVariableClick.bind(this);
        this.handleVariableDeleteClick = this.handleVariableDeleteClick.bind(this);
    }

    componentDidMount() {
        this.getVariablesAsync();
    }

    handleNewVariableClick() {
        this.props.onNewVariable();
    }

    handleVariableDeleteClick(variableId) {
        this.props.onVariableDelete(variableId);
        this.setState((state, _) => ({
            variables: state.variables.filter(v => v.variableId !== variableId)
        }));
    }

    async getVariablesAsync() {
        const { thingId } = this.props;

		try {
			if (!thingId || thingId === '')
				throw new Error('No device identifier provided.');

			const response = await axios.get(`api/variables/from/${thingId}`);
            
            this.setState({
                variables: response.data,
				loading: false
			});
            
		} catch (e) {
			this.setState({
				error: e.message
			});
		}
	}

    renderThingVariables() {
		const { variables } = this.state;
		const varTypes = [ "number", "string", "boolean" ];

		const varCollection = variables.length > 0 ? (
			<ListGroup>
				{ variables.map(v => 
					<ListGroup.Item key={v.variableId}>
                        <Stack direction="horizontal" gap={3}>
                            <p className="font-monospace my-0">{v.name}</p>

                            <p className="my-0">{ varTypes[v.type] }</p>

                            <Button 
                                variant="danger" 
                                className="ms-auto"
                                onClick={() => this.handleVariableDeleteClick(v.variableId)}>
                                <i className="bi bi-x"></i>
                            </Button>
                        </Stack>
					</ListGroup.Item>
				)}
			</ListGroup>
		) : (
			<>
				<i className="bi bi-thermometer-half fs-2"></i>
				<p className="fs-5">No variables yet!</p>

				<Button 
					variant="primary"
					onClick={ this.handleNewVariableClick }>
					Add a Variable
				</Button>
			</>
		);

		return varCollection;
	}

    render() {
        const { loading, error } = this.state;

        const variablesCollection = loading 
            ? <Spinner variant="black"/>
            : this.renderThingVariables();

        return (
            <div className="mt-2 mb-5">
                { error && <Alert variant="danger">{error}</Alert>}

                <Button 
                    variant="primary" 
                    className="mb-2"
                    onClick={ this.handleNewVariableClick }>
                    New Variable
                </Button>

                { variablesCollection }
            </div>
        );  
    }
}