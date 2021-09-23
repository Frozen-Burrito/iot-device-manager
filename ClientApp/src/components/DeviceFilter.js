import React, { Component } from 'react';
import { Stack, Col, Row, Form, Button, Dropdown } from 'react-bootstrap';

export class DeviceFilter extends Component {
  static displayName = DeviceFilter.name;

  constructor(props) {
    super(props);
    
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleLayoutToggle = this.handleLayoutToggle.bind(this);
  }

  handleQueryChange(queryStr) {
    this.props.onQueryChange(queryStr);
  }

  handleLayoutToggle(e) {
    this.props.onLayoutToggle();
  }

  render() {

    const { searchQuery, isGridView } = this.props.filters;

    return (
      <Form className="mt-4">
        <Row>
          <Col>
            <Stack direction="horizontal" gap={2}>
              <i className="bi bi-search"></i>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Search for a device"
                  value={ searchQuery }
                  onChange={e => this.handleQueryChange(e.target.value)}/>
              </Form.Group>

              <Button 
                variant="light" 
                className="me-0"
                style={{ fontSize: 20 }}
                disabled={ searchQuery.length === 0 }
                onClick={e => this.handleQueryChange('')}>
                <i className="bi bi-x"></i>
              </Button>
            </Stack>
          </Col>

          <Col md={3}/>

          <Col md={4}>
            <Stack direction="horizontal" gap={1}>

              <Dropdown className="ms-auto">
                <Dropdown.Toggle variant="light" id="tag-dropdown">
                  Filter by tag
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>Device</Dropdown.Item>
                  <Dropdown.Item>Sensor</Dropdown.Item>
                  <Dropdown.Item>Temperature</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown>
                <Dropdown.Toggle variant="light" id="tag-dropdown">
                  Filter by type
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>Actuator</Dropdown.Item>
                  <Dropdown.Item>Sensor</Dropdown.Item>
                  <Dropdown.Item>Controller</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Button 
                variant="light" 
                style={{ fontSize: 16 }}
                onClick={this.handleLayoutToggle}>
                { isGridView 
                  ? <i className="bi bi-list-task"></i>
                  : <i className="bi bi-grid-3x2-gap"></i> 
                }
              </Button>
            </Stack>
          </Col>
        </Row>
      </Form>
    );
  }
}