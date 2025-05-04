import { useEffect, useMemo, useRef, useState } from "react";
import { fetchSlides } from "./services/slideService.ts";
import { Slide } from "./types/slide.ts";
import { Box, IconButton, Text, Skeleton } from "@chakra-ui/react";
import { motion, useMotionValue, animate } from "framer-motion";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { useBreakpointValue } from "@chakra-ui/react";
import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";

type TTextStyle = {
    top?: number | string;
    left?: number | string;
    right?: number | string;
    bottom?: number | string;
    transform?: string;
};

export function MainCarrousel() {
    const positionMap: Record<string, TTextStyle> = {
        top_left: { top: 4, left: 12, transform: "none" },
        top_center: { top: 4, left: "50%", transform: "translateX(-50%)" },
        top_right: { top: 4, right: 12, transform: "none" },
        middle_left: { top: "50%", left: 12, transform: "translateY(-50%)" },
        middle_center: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
        middle_right: { top: "50%", right: 12, transform: "translateY(-50%)" },
        bottom_left: { bottom: 4, left: 12, transform: "none" },
        bottom_center: { bottom: 4, left: "50%", transform: "translateX(-50%)" },
        bottom_right: { bottom: 4, right: 12, transform: "none" },
    };

    const intervalTime = 20000;
    const intervalRef = useRef<number | undefined>(undefined);
    const [slides, setSlides] = useState<Slide[]>([]);
    const [visualIndex, setVisualIndex] = useState(1);
    const [loading, setLoading] = useState(true);
    const directionRef = useRef(1);
    const MotionBox = motion(Box);
    const x = useMotionValue(0);
    const isDesktop = useBreakpointValue({ base: false, md: true });

    useEffect(() => {
        fetchSlides()
            .then((data) => {
                const sorted = data.sort((a, b) => a.ordem - b.ordem);
                setSlides(sorted);
                x.set(-window.innerWidth);
                setLoading(false);
            })
            .catch((_e) => {
                setLoading(false);
            });
    }, []);

    const extendedSlides = useMemo(() => {
        if (slides.length === 0) return [];
        return [
            slides[slides.length - 1],
            ...slides,
            slides[0],
        ];
    }, [slides]);

    useEffect(() => {
        animate(x, -visualIndex * window.innerWidth, {
            type: "tween",
            ease: "easeInOut",
            duration: 1.5,
        });
    }, [visualIndex]);

    useEffect(() => {
        if (visualIndex === 0) {
            directionRef.current = -1;
            setVisualIndex(slides.length);
        } else if (visualIndex === slides.length + 1) {
            directionRef.current = 1;
            setVisualIndex(1);
        }
    }, [visualIndex, slides.length]);

    useEffect(() => {
        if (slides.length === 0) return;
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setVisualIndex((prev) => prev + 1);
        }, intervalTime);
        return () => clearInterval(intervalRef.current);
    }, [slides]);

    useEffect(() => {
        const handleResize = () => {
            x.set(-visualIndex * window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [visualIndex, x]);

    const nextSlide = () => {
        setVisualIndex((prev) => prev + 1);
    };

    const prevSlide = () => {
        setVisualIndex((prev) => prev - 1);
    };

    return (
        <Box position="relative" width="100%" height="60vh" overflow="hidden" borderRadius="md">
            {loading ? (
                <Skeleton width="100%" height="100%" />
            ) : (
                <MotionBox
                    display="flex"
                    width={`${extendedSlides.length * 100}vw`}
                    height="100%"
                    style={{ x }}
                    drag="x"
                    dragMomentum={false}
                    onDragStart={() => {
                        x.set(-visualIndex * window.innerWidth);
                    }}
                    onDragEnd={(_e, { offset }) => {
                        const threshold = window.innerWidth / 4;
                        if (offset.x < -threshold) {
                            nextSlide();
                        } else if (offset.x > threshold) {
                            prevSlide();
                        } else {
                            setVisualIndex(visualIndex);
                        }
                    }}
                >
                    {extendedSlides.map((s, i) => (
                        <Box key={i} minW="100vw" height="100%" position="relative">
                            <Box //Imagem
                                as="img"
                                src={`data:image;base64,${s.image}`}
                                objectFit="cover"
                                width="100%"
                                height="100%"
                                position="absolute"
                                top={0}
                                left={0}
                                zIndex={1}
                            />
                            <Box //Mascara azul
                                position="absolute"
                                top={0}
                                left={0}
                                width="100%"
                                height="100%"
                                bg="rgba(0, 0, 255, 0.3)"
                                zIndex={2}
                            />
                            <Box //Texto da imagem
                                position="absolute"
                                {...(positionMap[s.text_position] ?? {})}
                                p={4}
                                borderRadius="md"
                                width={isDesktop ? "40%" : "80%"}
                                zIndex={3}
                            >
                                <Text
                                    fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                                    textAlign={s.text_format}
                                    color={s.text_color}
                                    fontWeight={700}
                                    fontFamily="'Inter', sans-serif"
                                >
                                    {s.text}
                                </Text>
                                <Text
                                    fontSize={{ base: "s", md: "l", lg: "2xl" }}
                                    textAlign={s.text_format}
                                    color={s.text_color}
                                    fontWeight={300}
                                    mt={1}
                                    fontFamily="'Inter', sans-serif"
                                >
                                    {s.sub_text}
                                </Text>
                            </Box>
                        </Box>
                    ))}
                </MotionBox>
            )}

            {(slides.length > 1 && isDesktop) && (
                <>
                    <Box
                        position="absolute"
                        cursor="pointer"
                        top={0}
                        left={0}
                        height="100%"
                        width="4%"
                        onClick={prevSlide}
                        bg="transparent"
                        _hover={{
                            bg: { base: "transparent", md: "rgba(200, 200, 200, 0.2)" }
                        }}
                        transition={{ base: "none", md: "background-color 0.2s ease" }}
                        zIndex={4}
                    >
                        <IconButton
                            icon={<ArrowBackIcon boxSize={7} />}
                            onClick={prevSlide}
                            aria-label="Slide anterior"
                            position="absolute"
                            top="50%"
                            left="10px"
                            transform="translateY(-50%)"
                            zIndex={2}
                            colorScheme="whiteAlpha"
                            variant="ghost"
                            _hover={{ bg: "transparent" }}
                            _active={{ bg: "transparent" }}
                        />
                    </Box>

                    <Box
                        position="absolute"
                        cursor="pointer"
                        top={0}
                        right={0}
                        height="100%"
                        width="4%"
                        onClick={nextSlide}
                        bg="transparent"
                        _hover={{
                            bg: { base: "transparent", md: "rgba(200, 200, 200, 0.2)" }
                        }}
                        transition={{ base: "none", md: "background-color 0.2s ease" }}
                        zIndex={4}
                    >
                        <IconButton
                            icon={<ArrowForwardIcon boxSize={7} />}
                            onClick={nextSlide}
                            aria-label="Próximo slide"
                            position="absolute"
                            top="50%"
                            right="10px"
                            transform="translateY(-50%)"
                            zIndex={2}
                            colorScheme="whiteAlpha"
                            variant="ghost"
                            _hover={{ bg: "transparent" }}
                            _active={{ bg: "transparent" }}
                        />
                    </Box>
                </>
            )}
        </Box>
    );
}
