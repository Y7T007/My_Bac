import React, { useState, useEffect } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PropTypes from 'prop-types';

const LivesDisplay = ({  remaining }) => {
    const [currentLives, setCurrentLives] = useState(remaining);

    useEffect(() => {
        setCurrentLives(remaining);
    }, [remaining]);

    const renderLives = () => {
        const hearts = [];
        for (let i = 0; i < currentLives; i++) {
            hearts.push(<FavoriteIcon />);
        }
        for (let i = currentLives; i < 4; i++) {
            hearts.push(<FavoriteBorderIcon />);
        }
        return hearts;
    };

    return (
        <>
            {currentLives < 4 ? (
                <>
                    {renderLives()}

                </>
            ) : (
                <>

                    <FavoriteIcon />
                    <span style={{textAlign:'center'}}>&nbsp;{currentLives}</span>
                </>
            )}
        </>
    );
};

LivesDisplay.propTypes = {
    remaining: PropTypes.number.isRequired,
};

export default LivesDisplay;
