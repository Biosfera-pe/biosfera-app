import {apiGet} from "../../../../../services/apiServices.ts";
import {About} from "../types/about.ts";

export async function fetchAboutInfo(): Promise<About> {
    return apiGet<About>('/about')
}
