import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import chatApp from './reducer/reducers';
import { signin, addMessage } from './actions/actions';
import ChatInput from './component/chatInputComponent';
import ChatWindow from './commponent/chatWindowComponent';

const client = require('socket.io-client')('http://localhost:8080');

let store = createStore(chatApp);

let App = connect(
              state => ({
                  username: state.username,
                  messages: state.messages
              })
            )(Chat);

ReactDOM.render(<Provider store={store}>
                    <App />
                </Provider>,
                document.getElementById('app'));

class Chat extends React.Component {
    componentWillMount() {
        client.on('login', data => {
            this.props.dispatch(addMessage({ message: "Welcome to the chat!" }));
        });
        client.on('new message', data => {
            this.props.dispatch(addMessage(data));
        });
        client.on('user joined', ({ username }) => {
            this.props.dispatch(addMessage({ message: username + " joined the chat!" }));
        });
        client.on('user left', ({ username }) => {
            this.props.dispatch(addMessage({ message: username + " left the chat!" }));
        });
    }
    login(username) {
        this.props.dispatch(signin(username));
        client.emit('add user', username);
    }
    say(message) {
        this.props.dispatch(addMessage({ username: this.props.username, message }));
        client.emit('new message', message);
    }
    render() {
        return (
            <div>
                {this.props.username ?
                    <div>
                        <h1>Hello, {this.props.username}</h1>
                        <ChatWindow messages={this.props.messages} username={this.props.username} />
                        <ChatInput placeholder="what would you like to say?" submit={this.say.bind(this)} />
                    </div>
                        :
                    <div>
                        <h1>Choose a Username</h1>
                        <ChatInput placeholder="username" submit={this.login.bind(this)} />
                    </div>
                }
            </div>
        );
    }
}








