import { Box, useMediaQuery } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from 'scenes/navbar';
import UserWidget from 'scenes/widgets/UserWidget';
import MyPostWidget from 'scenes/widgets/MyPostWidget';
import PostsWidget from 'scenes/widgets/PostsWidget';
import AdvertWidget from 'scenes/widgets/AdvertWidget';
import FriendListWidget from 'scenes/widgets/FriendListWidget';
import RequestListWidget from 'scenes/widgets/RequestListWidget';
const RequestPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const {_id, picturePath} = useSelector((state) => state.user);

  return (
    <Box>
      <Navbar/>
      <Box 
       width="100%"
       padding="2rem 6%"
       display={isNonMobileScreens? "flex" : "block"}
       gap="2rem"
       >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath}/>
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="30%" marginLeft="2rem">
            <Box m="2rem 0"/>
            <RequestListWidget userId={_id} />
          </Box> 
        )}
      </Box>
    </Box>
     
  )
}

export default RequestPage;
