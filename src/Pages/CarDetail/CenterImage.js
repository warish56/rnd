import React from 'react';

import styles from './style.module.css'


const CenterImage = ({image}) => {
    return (
        <div className={styles.imageBox}>
            <img  src={image} alt="car image" />
            </div>
    )
}


export default CenterImage;