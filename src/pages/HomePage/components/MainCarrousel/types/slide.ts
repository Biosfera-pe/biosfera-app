export type Slide = {
    ordem: number;
    image: string;
    text: string;
    sub_text: string;
    text_color: string;
    text_boldness: number;
    text_format: 'center' | 'justify' | 'left' | 'right';
    text_position:
        | 'top_left' | 'top_center' | 'top_right'
        | 'middle_left' | 'middle_center' | 'middle_right'
        | 'bottom_left' | 'bottom_center' | 'bottom_right';
}
