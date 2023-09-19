import React from 'react';
import PropTypes from "prop-types";

const NoteDisplay = ({ note }) => {
    function increaseExposure(color, factor) {
        // Parse the color string into R, G, B components
        const [, r, g, b] = color.match(/(\d+), (\d+), (\d+)/);

        const maxComponent = Math.max(r, g, b);

        const normalizedR = r / maxComponent;
        const normalizedG = g / maxComponent;
        const normalizedB = b / maxComponent;

        const newR = Math.min(Math.round(normalizedR * factor * maxComponent), 255);
        const newG = Math.min(Math.round(normalizedG * factor * maxComponent), 255);
        const newB = Math.min(Math.round(normalizedB * factor * maxComponent), 255);

        return `rgb(${newR}, ${newG}, ${newB})`;
    }

    // Calculate the color based on the note value
    const colorValue = Math.min(Math.max(note, 0), 20); // Clamp note between 0 and 20
    const redValue = Math.round((1 - colorValue / 20) * 255);
    const greenValue = Math.round((colorValue / 20) * 255);
    const colortemp = `rgb(${redValue}, ${greenValue}, 0)`;
    const color = increaseExposure(colortemp, 3); // Increase exposure by a factor of 1.5


    // Create the color string in RGB format

    // Style for the background color
    const backgroundColorStyle = {
        color: color,
        fontWeight:'bold',
    };

    return (
        <div>
            <div style={backgroundColorStyle}>{note?note+'/20':''}</div>
        </div>
    );
};
NoteDisplay.propTypes= {
    note: PropTypes.number,
};

export default NoteDisplay;
