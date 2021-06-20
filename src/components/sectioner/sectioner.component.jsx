import React from 'react';
import { Pricer } from '../pricer/pricer.component';
import './sectioner.styles.scss';

export const Sectioner = ({portfolios, disabler}) => {

    return(
        <div className="sectioner">
            {Object.keys(portfolios).map((port, index) => (
                <Pricer key={index} price={port} disabled={portfolios[port].disabled} disabler={disabler} /> 
            ))}
        </div>
    );
}