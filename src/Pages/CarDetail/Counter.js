import React from 'react';

import styles from './style.module.css';

const Counter  = ({total,current}) => {
    return (
        <div className={styles.counterContainer}>
            <div className={styles.line_large}/>
            <span>{current}</span>
            <div className={styles.line_small}/>
            <span>{total}</span>
            <div className={styles.line_large}/>

        </div>
    )
}

export default Counter;