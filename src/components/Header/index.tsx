import {
    Flex,
    Image,
    Button,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useBreakpointValue,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import logoUrl from "../../assets/logo.svg";
import { HeaderButton } from '../HeaderButton';
import { useLocation } from "react-router-dom";

export function Header() {
    const isDesktop = useBreakpointValue({ base: false, md: true });
    const actualLocation = useLocation();
    const isActualButton = (urlLink: string) => {
        return actualLocation.pathname === urlLink;
    };

    return (
        <Flex
            px={6}
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            height="8vh"
        >
            <Image src={logoUrl} height="7vh" />

            {isDesktop ? (
                <Flex gap={4} alignItems="center">
                    <HeaderButton title="Início" urlLink="/" />
                    <HeaderButton title="Sobre Nós" urlLink="/about" />
                    <HeaderButton title="Serviços" urlLink="/services" />
                    <HeaderButton title="Projetos" urlLink="/projects" />
                    <HeaderButton title="Solicitar Orçamento" urlLink="/budget" blueButton />
                </Flex>
            ) : (
                <Menu>
                    <MenuButton
                        height="7vh"
                        as={IconButton}
                        icon={<HamburgerIcon boxSize="28px" />}
                        variant="ghost"
                        aria-label="Abrir menu"
                        color="#021A61"
                    />
                    <MenuList
                        width="90vw"
                        maxWidth="90vw"
                        top="7vh"
                        left="50%"
                        transform="translateX(-50%)"
                        borderRadius="md"
                        padding={0}
                        zIndex={9999}
                        boxShadow="lg"
                    >
                        <MenuItem as="a" href="/" justifyContent="center" backgroundColor={isActualButton("/") ? "lightblue" : "white"}>Início</MenuItem>
                        <MenuItem as="a" href="/about" justifyContent="center" backgroundColor={isActualButton("/about") ? "lightblue" : "white"}>Sobre Nós</MenuItem>
                        <MenuItem as="a" href="/services" justifyContent="center" backgroundColor={isActualButton("/services") ? "lightblue" : "white"}>Serviços</MenuItem>
                        <MenuItem as="a" href="/projects" justifyContent="center" backgroundColor={isActualButton("/projects") ? "lightblue" : "white"}>Projetos</MenuItem>
                        <MenuItem as="a" href="/budget" justifyContent="center" backgroundColor={isActualButton("/budget") ? "lightblue" : "white"}>
                            <Button w="100%" backgroundColor="#021A61" size="sm" color="white">
                                Solicitar Orçamento
                            </Button>
                        </MenuItem>
                    </MenuList>
                </Menu>
            )}
        </Flex>
    );
}
