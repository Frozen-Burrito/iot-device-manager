import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

export class HomePage extends Component {
  static displayName = HomePage.name;

  render () {
    return (
      <div className="home-banner">
        <Container>
          <h1 className="display-3 text-white text-center">
            IoT Device Manager
          </h1>
          
          <h2 className="display-6 text-light text-center">
            Control and Monitor All Your Things
          </h2>

          <p className="text-light text-center mt-5">
            Photo by <a className="text-light" href="https://unsplash.com/@_louisreed">Louis Reed</a> on <a className="text-light" href="https://unsplash.com">Unsplash</a>
          </p>
        </Container>
      </div>
    );
  }
}
