import {useEffect, useMemo, useRef, useState} from "react";
import {Box, Flex, Skeleton, Text, useBreakpointValue} from "@chakra-ui/react";
import {About} from "./types/about.ts";
import {fetchAboutInfo} from "./services/aboutService.ts";

export function AboutSummary() {

    const [about, setAbout] = useState<About>({} as About);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAboutInfo()
            .then((data) => {
                setAbout(data);
                setLoading(false);
            })
            .catch((_e) => {
                setLoading(false);
            });
    }, []);

    const aboutDescription = useMemo(() => {
        const description = about.about ?? '';
        return description.replace(/\\n/g, '\n')
    }, [about]);

    const headingSize = useBreakpointValue({ base: '2xl', md: '2xl', lg: '4xl' });
    const textSize = useBreakpointValue({ base: 's', md: 'md', lg: 'l' });

    const textBoxRef = useRef<HTMLDivElement>(null);
    const [textHeight, setTextHeight] = useState<string>('auto');

    useEffect(() => {
        if (textBoxRef.current) {
            setTextHeight(`${textBoxRef.current.offsetHeight}px`);
        }
    }, [loading, aboutDescription]);

    return (
        <Flex
            alignItems="center"
            flexWrap="wrap"
            flexDirection={{ base: 'column', md: 'row' }}
            justifyContent="space-between"
            pb={6}
            my={8}
        >
            <Flex
                flexDirection="column"
                width={{ base: "100%", md: "50%" }}
                justifyContent="space-between"
                px={8}
                ref={textBoxRef}
            >
                <Text
                    fontSize={headingSize}
                    fontWeight="semibold"
                >
                    Quem Somos
                </Text>
                <Box mt={4}>
                    {loading ? (
                        <Skeleton />
                    ) : (
                        <Text
                            fontSize={textSize}
                            whiteSpace="pre-wrap"
                            textAlign="justify"
                        >
                            {aboutDescription}
                        </Text>
                    )}
                </Box>
            </Flex>
            <Box
                width={{ base: "100%", md: "50%" }}
                display={{base:"none", md:"flex"}}
                alignItems="center"
                justifyContent="center"
                height={textHeight}
            >
                {loading ? (
                    <Skeleton width="100%" height="50vh" />
                ) : (
                    <Box //Imagem
                        as="img"
                        src={`data:image;base64,${about.image}`}
                        borderRadius="20px"
                        objectFit="cover"
                        zIndex={1}
                        height={textHeight}
                        width="90%"
                        boxShadow="6px 6px 12px rgba(0, 0, 0, 0.6)"
                    />
                )}
            </Box>
        </Flex>
    );
}