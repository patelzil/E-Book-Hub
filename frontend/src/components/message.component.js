import React from 'react'
import { Card } from 'react-bootstrap'

export default function Message({senderName, message, time}) {
    // const currentUser = JSON.parse(localStorage.getItem("userObject"));
    const currentUser = "Zil"
    return (
        <div className="message-container">
            {
                senderName === currentUser ? (
                    <div className="chat-right">
                        <Card.Title>{senderName}</Card.Title>
                        <Card.Text style={{marginLeft: '8px'}}>{message}</Card.Text>
                        <Card.Text style={{textAlign: 'right', fontSize: "12px"}}>{time}</Card.Text>
                    </div>
                ) : (
                    <div className="chat-left">
                        <Card.Title>{senderName}</Card.Title>
                        <Card.Text style={{marginLeft: '8px'}}>{message}</Card.Text>
                        <Card.Text style={{textAlign: 'right', fontSize: "12px"}}>{time}</Card.Text>
                    </div>
                )
            }
        </div>
    )
}
