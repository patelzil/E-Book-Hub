import React from "react";
import io from 'socket.io-client'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isConnected: false,
            data: null,
            messages: [],
            text: "",
            username:""
        }
        this.socket =  io('http://localhost:3005', {
            transports: ['websocket'],
        });
    }

    componentDidMount() {
        this.socket.on('connect', () => {
            this.setState({ isConnected: true });
        });
    }


    render(){
        return (
            <>
                <div>
                    connection: {this.state.isConnected ? "connected" : "not connected"}
                </div>
            </>
        )
    }
}
