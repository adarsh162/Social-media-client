import { Box } from '@mui/material';
import ChatUser from 'components/ChatUser';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ChatUserWidget = ({user, setChat, search, setReload, reload = false}) => {
  const [chats, setChats] = useState([]);
  const token = useSelector((state) => state.token);
  const userId = useSelector((state) => state.user._id);
  const fetchChats = async () => {
    const response = await fetch(`https://social-media-backend-2-dzbo.onrender.com/chat/${userId}/fetchAll`,{
      method: "GET",
      headers: { Authorization : `Bearer ${token}`}
  });
  const data = await response.json();
  console.log(search)
  if(search){
    const filterd = data.filter((chat) => chat.users.some((u) => u.firstName.toLowerCase().includes(search) || u.lastName.toLowerCase().includes(search)));
    setChats(filterd);
    console.log(filterd);
  }
  else{
    setChats(data);
  }
}
 useEffect(() => {
  fetchChats();
 },[search]);
  //fetch chats from fetch all chat api
  return (
    <Box sx={{display: "flex", flexDirection: "column", gap: "0rem", maxHeight: "75vh", overflowY: "auto",'&::-webkit-scrollbar': {
                    display: 'none', // Chrome, Safari, and Edge
                }}}>
        {chats.map((chat) => (
            <Box onClick={() => {setChat(chat);setReload(!reload);}}>
            <ChatUser chat={chat} key={chat._id} />
            </Box>
        ))}
    </Box>
  )
}

export default ChatUserWidget
