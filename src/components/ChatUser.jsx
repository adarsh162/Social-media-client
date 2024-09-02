import React from 'react';
import UserImage from './UserImage';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';

const ChatUser = ({chat}) => {
  const { _id } = useSelector((state) => state.user);
  const users = chat.users;
  const user = users.find(user => user._id !== _id);
  return (
    <Box sx={{display: "flex", gap: "0.9rem", alignItems: "center", padding: "1rem 1rem",
        '&:hover': {
                    backgroundColor: 'rgb(71 85 105)',
                    transition: 'background-color 0.3s ease',
                    cursor: 'pointer',
                },
    }}>
      <UserImage image={user.picturePath} size="55px" />
      <div style={{justifyContent: "center"}}>
        <p style={{margin: "0.2rem 0", fontSize: "1rem"}}>{user.firstName} {user.lastName}</p>
        <span>{user.email}</span>
      </div>
    </Box>
  )
}

export default ChatUser;
