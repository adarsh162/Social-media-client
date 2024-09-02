import React from 'react';
import { Box, Button, Icon, IconButton, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from 'scenes/navbar';
import MyPostWidget from 'scenes/widgets/MyPostWidget';
import FriendListWidget from 'scenes/widgets/FriendListWidget';
import { useParams } from 'react-router-dom';
import UserWidget from 'scenes/widgets/UserWidget';
import PostsWidget from 'scenes/widgets/PostsWidget';
const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedUser = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');
  const isUser = loggedUser._id === userId;
  const [isFriend, setIsFriend] = useState({});
  const getFriends = async () => {
    const response = await fetch(
        `https://social-media-backend-2-dzbo.onrender.com/users/${loggedUser._id}/friends`,{
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        }
    );
    if(response.ok){
        const data = await response.json();
        setIsFriend(data.find((friend) => friend._id === userId));
    }
}
  const getUser = async () => {
    const response = await fetch(
      `https://social-media-backend-2-dzbo.onrender.com/users/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    const data = await response.json();
    setUser(data);
  }
  useEffect(() => {
    getFriends();
    getUser();
  },[userId]);
  if (!user) {
    return null;
  }
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center">
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0">
            <FriendListWidget userId={userId} />
          </Box>
        </Box>
        <Box flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}>
          {isUser && (<>
            <MyPostWidget picturePath={user.picturePath} />
            <PostsWidget userId={userId} isProfile={true} />
          </>)}
          {isFriend && (<PostsWidget userId={userId} isProfile={true} />)}
        </Box>
      </Box>
    </Box>
  )
}

export default ProfilePage
