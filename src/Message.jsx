import React, { Component } from 'react';

class Message extends Component {
  render() {
    return (
      <div>
        {this.props.uniqueMessage}
      </div>
    );
  }
}

export default Message;