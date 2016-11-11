import React from 'react';

export default class Message extends React.Component {
    static propTypes = {
        message: React.PropTypes.string.isRequired,
        me: React.PropTypes.bool.isRequired,
        username: React.PropTypes.string
    };
    render() {
        return (
            <div style={{
                display: "flex"
            }}>
                { this.props.me ? <p style={{
                    marginRight: "20px"
                }}>{this.props.username}</p> : undefined }
                <div className={this.props.me ? "bubble me" : "bubble other"}>
                    <p className="chat-text">{this.props.message}</p>
                </div>
                { !this.props.me ? <p style={{
                    marginLeft: "20px"
                }}>{this.props.username}</p> : undefined }
            </div>
        );
    }
}
