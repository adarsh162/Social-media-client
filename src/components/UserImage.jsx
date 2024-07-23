import { Box } from "@mui/material";

const UserImage = ({ image, size="60px"}) => {
    //objectfit : cover property will crop the image as neccessary to fit the given size.border radius is to make it round.
    return <Box width={size} height={size}>
        
        <img 
            style={{ objectFit: "cover", borderRadius: "50%"}}
            width={size}
            height={size}
            src={`http://localhost:3001/assets/${image}`} 
            alt="User"
             />
    </Box>
}

export default UserImage;