import React from 'react';
import './pricer.styles.scss';

export const  Pricer = ({price, disabled, disabler}) => {
    console.log('values on pricer: ', price, disabled);
    return(
        <span className={`pricer ${disabled ? 'disabled' : ''}`} onClick={() => disabler(price)}>
            <b>${price}</b>
        </span>
    );
}