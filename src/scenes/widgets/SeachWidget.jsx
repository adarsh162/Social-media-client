import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends, setRequests } from "state";

const SearchWidget = ({search}) => {
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const token = useSelector((state)=>state.token);
    const {_id, friend_requests} = useSelector((state)=>state.user);
    const [data, setData] = useState([]);

    const getResult = async () => {
        const response = await fetch(
            `http://localhost:3001/users/${_id}/getSearchUsers`,{
                method: "GET",
                headers: {Authorization: `Bearer ${token}`}
            }
        );
        if(response.ok){
            const res = await response.json();
            setData(res.filter((user)=>user.firstName.toLowerCase().includes(search) || user.lastName.toLowerCase().includes(search)));
        }
    }
    useEffect(()=>{
        getResult();
    },[search]);
    return (
        <WidgetWrapper>
            <Typography
                color={palette.neutral.dark}
                variant="h5"
                fontWeight="500"
                sx={{mb: "1.5rem"}}
            >
                Search Results
            </Typography>
            <Box display="flex" flexDirection="col" gap="1.5rem">
                {data.map((friend)=>(
                    <Friend 
                        key={friend._id} 
                        friendId={friend._id} 
                        name={`${friend.firstName} ${friend.lastName}`} 
                        subtitle={friend.occupation} 
                        userPicturePath={friend.picturePath}
                    />
                ))}
            </Box>
        </WidgetWrapper>
    )
}

export default SearchWidget;