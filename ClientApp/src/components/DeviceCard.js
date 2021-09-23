import React, { Component } from 'react';
import { Stack, Col, Card, Button, Badge, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class DeviceCard extends Component {
  static displayName = DeviceCard.name;

  constructor(props) {
    super(props);
    this.state = {
      thing: this.props.thing
    };
  }

  render() {

    const { thing } = this.state;

    return (
      <Col className="mt-3">
        <Card>
          <Card.Body>
            <Card.Title tag="h5">
              <Stack direction="horizontal" gap={1}>
                {thing.name}

                <Dropdown className="ms-auto">
                  <Dropdown.Toggle as={Button} variant="transparent" id="dropdown-basic">
                    <i className="bi bi-three-dots-vertical"></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={e => console.log("Edit")}>Edit</Dropdown.Item>
                    <Dropdown.Item onClick={e => console.log("Remove")}>Remove</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Stack>
            </Card.Title>
            <Card.Subtitle tag="h6" className="mb-2 text-muted">{thing.identifier}</Card.Subtitle>

            <Stack direction="horizontal" gap={1}>
              {thing.labels.split(', ').map(label => 
                <Badge key={label} bg="info">
                  { label.replace(/^\w/, (c) => c.toUpperCase()) }
                </Badge>
              )}
            </Stack>

            <Card.Text>
              {thing.shortDescription.length > 130 
                ? thing.shortDescription.substr(0, 130) + "..."
                : thing.shortDescription
              }
            </Card.Text>
            <Link to={`/devices/${thing.identifier}`} className="btn btn-primary">View</Link>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}