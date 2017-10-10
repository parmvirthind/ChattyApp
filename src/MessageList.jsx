import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  render() {

    // Map the array of messages
    const message = this.props.messages.map(msg => {
      return <div key={msg.id} className="message">
        <span className={`message-username ${msg.colorID}`}>{msg.username}</span>
        <span className="message-content">{msg.content}</span>
      </div>
    })

    return (
      <main className="messages">
        <Message uniqueMessage={message} />
      </main>
    );
  }
}

export default MessageList;