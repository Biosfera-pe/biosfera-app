import {Slide} from "../types/slide.ts";
import {apiGet} from "../../../../../services/apiServices.ts";

export async function fetchSlides(): Promise<Slide[]> {
    return apiGet<Slide[]>('/slides')
}
