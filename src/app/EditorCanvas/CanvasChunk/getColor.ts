import { ZxColorNames } from "@/app/models/zx-color-names";

interface GetColorProps {
    type: string,
    color: ZxColorNames | null,
    canvasColor: ZxColorNames | null,
    isPreview: boolean,
    isSelected: boolean
}

export const getColor = ({
    type,
    color,
    canvasColor,
    isPreview,
    isSelected
}: GetColorProps) => {

    if (isSelected) {
        return type === 'paper'
            ? 'black'
            : 'white'
    }

    return isPreview ? (color || canvasColor) : canvasColor;
};
