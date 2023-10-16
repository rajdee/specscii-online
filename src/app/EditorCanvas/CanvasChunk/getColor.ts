export const getColor = ({
    type,
    color,
    canvasColor,
    isPreview,
    isSelected
}) => {
    if (isSelected) {
        return type === 'paper'
            ? 'black'
            : 'white'
    }

    return isPreview ? (color || canvasColor) : canvasColor;

};
