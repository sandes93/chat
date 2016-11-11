import React from 'react';

export default class ChatInput extends React.Component {
    static propTypes = {
        submit: React.PropTypes.func.isRequired,
        placeholder: React.PropTypes.string
    };
    change(event) {
        if (event.key === 'Enter') {
            this.props.submit(event.target.value);
            event.target.value = "";
        }
    }
    render() {
        return (
            <input type="text" className="chat-input" placeholder={this.props.placeholder} onKeyPress={this.change.bind(this)} />
        )
    }
}

