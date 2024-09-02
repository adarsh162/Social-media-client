import { Box } from "@mui/material";

const UserImage = ({ image, size="60px"}) => {
    //objectfit : cover property will crop the image as neccessary to fit the given size.border radius is to make it round.
    return <Box width={size} height={size}>
        
        <img 
            style={{ objectFit: "cover", borderRadius: "50%"}}
            width={size}
            height={size}
            src={`https://social-media-backend-2-dzbo.onrender.com/assets/${image}`} 
            alt="User"
            className="max-h-fill-available"
             />
    </Box>
}

export default UserImage;