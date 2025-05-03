import {Button} from "@chakra-ui/react";
import {useLocation} from "react-router-dom";

interface HeaderButtonProps {
    title: string;
    urlLink: string;
    blueButton?: boolean;
}

export function HeaderButton({ title, urlLink, blueButton }: HeaderButtonProps) {

    const actualLocation = useLocation();

    return (
        <Button
            as="a"
            href={urlLink}
            backgroundColor={blueButton ? "#021A61" : actualLocation.pathname === urlLink ? "lightblue" : "whitesmoke"}
            color={blueButton ? "white" : "black"}
        >
            {title}
        </Button>
    )
}