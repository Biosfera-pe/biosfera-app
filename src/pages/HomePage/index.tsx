import {Header} from "../../components/Header";
import {MainCarrousel} from "./components/MainCarrousel";
import {AboutSummary} from "./components/AboutSummary";

export function HomePage() {
    return (
        <>
            <Header />
            <MainCarrousel />
            <AboutSummary />
        </>
    )
}