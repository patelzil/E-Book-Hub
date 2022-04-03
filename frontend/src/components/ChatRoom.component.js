import React from "react";
import io from 'socket.io-client'
import { Button, Form } from "react-bootstrap";
import Message from './message.component';
import axios from "axios";

export default class ChatRoom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isConnected: false,
            messages: [],
            message: "",
            username: JSON.parse(localStorage.getItem("userObject")).username,
            bookClub: props.bookClub.bookclubName,
        }

        let currentState = this;
        axios.get("http://localhost:5000/EBookHub/books/bookclub/getBookclub/" + this.state.bookClub)
            .then(function(response){
                if(response.data.status === "Success") {
                    currentState.setState({messages: response.data.message.MessagesInfo})
                }
            })
            .catch(function (error) {
                console.log("Error fetching book club info" + error)
            })

        this.socket =  io('http://localhost:3005', {
            transports: ['websocket'],
        });
    }

    componentDidMount() {
        this.socket.on('connect', () => {
            this.setState({isConnected: true});
        });

        this.socket.on('message', (message) => {
            const getFullTime = () => {
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
                const date = new Date();
                const month = months[date.getMonth()];
                const hour = (date.getHours() > 12) ? date.getHours() - 12 : date.getHours();
                const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
                const am_pm = (date.getHours() > 12) ? " p.m." : " a.m.";
                return (month + " " + date.getDate() + "," + date.getFullYear() + " " + hour + ':' + minutes + am_pm)
            }

            // add the message to the database here
            const club = this.state.bookClub;
            const newMsg = {
                sender: this.state.username,
                message: message,
                time: getFullTime()
            }

            this.setState({messages: [...this.state.messages, newMsg]})
            let currentState = this;
            axios.post(`http://localhost:5000/EBookHub/books/bookclub/message`, {bookclubName: club, data: newMsg})
                .then(function(response)
                {
                    if(response.data.status === "Success")
                    {
                        currentState.setState({messages: response.data.data})
                    }
                    else if(response.data.status === "Fail")
                    {
                        console.log("Could not send the message")
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })
        });
    }

    onChangeMsg = (e) =>{
        this.setState({ message: e});
    }

    onSend = (event) =>{
        event.preventDefault();
        if(this.state.message.length > 0) {
            this.socket.emit('message', this.state.message)
            this.setState({message: ""})
        }
    }

    render(){
        return (
            <>
                <div style={{display:'flex',flexDirection:'column',height:'92%', justifyContent:'space-between', alignItems:'center'}}>
                    <div
                        style={{width:'100%', display: 'flex', flexDirection: "column-reverse", paddingRight: '10px',
                            paddingLeft: '5px',marginBottom: "10px", height:'100%', overflow: "scroll"
                        }}
                    >
                            {this.state.messages.length > 0 ? (
                                this.state.messages.slice(0).reverse().map(msg =>
                                    <Message key={msg.id} message={msg.message} time={msg.time} senderName={msg.sender}/>
                                )
                            ) : (
                                <div style={{display: "flex", alignItems: "center", justifyContent: 'space-around', height: '100%'}}><h4>No chats to display.</h4></div>
                            )}
                    </div>
                    <div style={{boxShadow: '0px -8px 10px #616161', display: 'flex', alignItems: "center", width: '100%', borderRadius:'5px'}}>
                        <Form style={{display: 'flex', flexDirection: "row", paddingLeft: '5%', paddingRight: '5%', width: '100%'}}>
                            <input
                                value={this.state.message}
                                autoComplete={"off"}
                                placeholder="Message..."
                                style={{ width: '80%', height: '34px', margin: "5px", padding: '9px', borderRadius: "10px", borderColor: "1px black", borderWidth: "1px"}}
                                onChange={ e => {this.onChangeMsg(e.target.value)}}
                            />
                            <Button
                                className="button"
                                variant="primary"
                                type="submit"
                                style={{width: "68px", height: "34px", margin: '5px'}}
                                onClick={this.onSend}
                            >
                                Send
                            </Button>
                        </Form>
                    </div>
                </div>
            </>
        )
    }
}
