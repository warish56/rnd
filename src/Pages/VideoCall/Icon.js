import React from 'react';

import './style.css';

const VideoControlIcon = ({name,className, active = true, red, blue, ...otherProps}) => {

    return (
        <button {...otherProps} className={`video-control-button  ${active ? 'deactive-icon' :'active-icon'}  ${red ? 'deactive-icon' :''}  ${blue ? 'active-icon': ''}`}>
        <i className={`fas fa-${name}`}></i>
        </button>
    )
}

export default VideoControlIcon;