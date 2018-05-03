import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import './custom-animation.css';

export default class ResultModal extends Component {
  render() {
    const {openModal} = this.props;
    const {closeModal} = this.props;
    return (
      <div className="modal">       
        
        <Modal
          open={openModal}
          onClose={closeModal}
          center
          classNames={{
            transitionEnter: 'transition-enter',
            transitionEnterActive: 'transition-enter-active',
            transitionExit: 'transition-exit-active',
            transitionExitActive: 'transition-exit-active',
          }}
          animationDuration={1000}
        >
          <p>
            {this.props.modalText}
          </p>
        </Modal>
      </div>
    );
  }
}