import { useTheme } from "@emotion/react";
import { Typography, useThemeProps } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
    const {palette} = useTheme();
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    return (
        <WidgetWrapper>
            <FlexBetween>
                <Typography color={dark} variant="h5" fontWeight="500">
                    Sponsored
                </Typography>
                <Typography color={medium}>
                    Create Ad
                </Typography>
            </FlexBetween>
            <img
                width="100%"
                height="auto"
                alt="advert"
                src="https://social-media-backend-2-dzbo.onrender.com/assets/info4.jpeg"
                style={{ borderRadius : "0.75rem", margin: "0.75rem 0"}}
            />
            <FlexBetween>
             <Typography color={main}>MikaCossmetics</Typography>
             <Typography color={main}>mikacosmetics.com</Typography>
            </FlexBetween>
            <Typography color={medium} m="0.5rem 0">
                Your pathway to stunning and immaculate beauty and made sure your skin
                is well taken care of.
            </Typography>

        </WidgetWrapper>
    )
}

export default AdvertWidget;