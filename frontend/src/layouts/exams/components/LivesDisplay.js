import React, { useState, useEffect } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PropTypes from 'prop-types';
import './LiveDisplay.css'

const LivesDisplay = ({  remaining }) => {
    const [currentLives, setCurrentLives] = useState(remaining);
    const [shouldExplode, setShouldExplode] = useState(false);

    useEffect(() => {
        setCurrentLives(remaining);
        setShouldExplode(true); // Trigger the explosion animation
        setTimeout(() => {
            setShouldExplode(false); // Turn off the animation after a delay
        }, 500);
    }, [remaining]);

    const renderLives = () => {
        const hearts = [];
        for (let i = 0; i < currentLives; i++) {
            hearts.push(<FavoriteIcon key={i} className={shouldExplode ? 'heart-explode' : ''} />);
        }
        for (let i = currentLives; i < 4; i++) {
            hearts.push(<FavoriteBorderIcon key={i} />);
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

                    <FavoriteIcon className={shouldExplode ? 'heart-explode' : ''} />                    <span style={{textAlign:'center'}}>{currentLives}</span>
                </>
            )}
        </>
    );
};


LivesDisplay.propTypes = {
    remaining: PropTypes.number.isRequired,
};

export default LivesDisplay;
