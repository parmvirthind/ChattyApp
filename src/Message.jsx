import React, { Component } from 'React';

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