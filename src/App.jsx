import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: ""}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
    this.sendMsg = this.sendMsg.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);

    this.exampleSocket = new WebSocket("ws://localhost:3001");
    this.exampleSocket.onopen = (function(event) {
    console.log("Connection open");
    })
    var theApp = this;
    this.exampleSocket.onmessage = (function(event) {
      const dataObject = JSON.parse(event.data);
      const messages = theApp.state.messages.concat(dataObject);
      theApp.setState({messages: messages});
    })
  }

sendMsg(content) {
  const newMessage = {username: this.state.currentUser.name, content: content};
  this.exampleSocket.send(JSON.stringify(newMessage));
}

setUser(content) {
  this.setState({currentUser: {name: content}});
}

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar sendMsg={this.sendMsg} setUser={this.setUser} />
      </div>
    );
  }
}
export default App;

