import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

export class CustomModal extends Component {
  static displayName = CustomModal.name;

  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
  }

  handleClose() {
    this.props.onCloseModal();
  }

  handleAccept() {
    this.props.onAcceptModal();
  }

  render() {

    const { 
      show,
      data
    } = this.props;

    return (
      <Modal show={show} onHide={ this.handleClose }>
        <Modal.Header closeButton>
          <Modal.Title>{ data.title }</Modal.Title>
        </Modal.Header>
        <Modal.Body>{ data.body }</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ this.handleClose }>
            Close
          </Button>
          <Button variant={ data.actionColor} onClick={ this.handleAccept }>
            { data.action }
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}