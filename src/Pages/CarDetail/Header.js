import React from 'react';

import styles from './style.module.css'

const SearchBar = () => {
    return(
        <div className={styles.searchBar}>
            <i class="fas fa-search"></i>
        </div>
    )
}

const Header = ({logo}) => {
    return (
        <div className={styles.headerContainer}>

            <img src={logo} alt="company logo"/>

            <ul className={styles.headerList}>
                <li style={{animation:'slideInRight 500ms ease  300ms forwards'}}>Model</li>
                <li style={{animation:'slideInRight 500ms ease  600ms forwards'}}>Inventory</li>
                <li style={{animation:'slideInRight 500ms ease  900ms forwards'}}>Technology</li>
                <li style={{animation:'slideInRight 500ms ease  1200ms forwards'}}>Contact</li>
                <li style={{animation:'slideInRight 500ms ease  1500ms forwards'}}><SearchBar/></li>
            </ul>

        </div>
    )
}


export default Header;