import Message from 'components/Message'
import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import ScrollableFeed from 'react-scrollable-feed'
import { io } from "socket.io-client";

var socket;
const ENDPOINT = "https://social-media-backend-2-dzbo.onrender.com";
const MessageWidget = ({ chat, reload }) => {
  const [messages, setMessages] = useState([]);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const lastMessageRef = useRef(null);
  const fetchMessages = async () => {
    const res = await fetch(`https://social-media-backend-2-dzbo.onrender.com/msgs/getChatMessages/${chat._id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setMessages(data);
  }
  useEffect(() => {
    fetchMessages();
    
  }, [reload]);
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("message_recieved", (newMessageRecieved) => {
      setMessages([...messages, newMessageRecieved]);
    });
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  })
  return (
    <div className='mt-[12vh] mb-[9vh] '>

      <ScrollableFeed>
      {messages.map((message) => (
        <Message key={message._id} timestamp={message.createdAt} sender={message.sender} content={message.content} />
      ))}
      <div ref={lastMessageRef} />
      </ScrollableFeed>
    </div>
  )
}

export default MessageWidget
