import React from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from 'scenes/navbar';
import MyPostWidget from 'scenes/widgets/MyPostWidget';
import FriendListWidget from 'scenes/widgets/FriendListWidget';
import { useParams } from 'react-router-dom';
import UserWidget from 'scenes/widgets/UserWidget';
import PostsWidget from 'scenes/widgets/PostsWidget';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');

  const getUser = async () => {
    const response = await fetch(
      `https://social-media/users/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    const data = await response.json();
    setUser(data);
  }
  useEffect(() => {
    getUser();
  }, []);
  if(!user){
    return null;
  }
  return (
    <Box>
      <Navbar />
      <Box 
       width="100%"
       padding="2rem 6%"
       display={isNonMobileScreens? "flex" : "block"}
       gap="2rem"
       justifyContent="center">
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath}/>
          <Box m="2rem 0">
            <FriendListWidget userId={userId}/>

          </Box>
        </Box>
        <Box flexBasis={isNonMobileScreens ? "42%" : undefined}
             mt={isNonMobileScreens ? undefined : "2rem"}>
              
          <MyPostWidget picturePath={user.picturePath} />
          <PostsWidget userId={userId} isProfile={true}/>
        </Box>
      </Box>
    </Box>
  )
}

export default ProfilePage
