import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { NavMenu } from '../components/NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <NavMenu />
        
        {this.props.children}

        <Container fluid className="py-3 bg-light text-dark text-center">
          Built by <a href="https://github.com/Frozen-Burrito">FrozenBurrito</a>
        </Container>
      </div>
    );
  }
}
