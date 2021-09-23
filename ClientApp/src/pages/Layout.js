import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { NavMenu } from '../components/NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <NavMenu />
        <Container>
          {this.props.children}
        </Container>

        <Container fluid className="mt-5 py-3 bg-light text-dark text-center">
          Built by FrozenBurrito
        </Container>
      </div>
    );
  }
}
