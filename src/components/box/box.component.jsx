import React from 'react';
import './box.styles.scss';

const Box = ({ number, handleClick }) => {
    return (
        <div className='box' onClick={handleClick}>
            <span>{number}</span>
        </div>
    )
}
export default Box;