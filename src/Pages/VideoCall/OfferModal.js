import React from 'react';

import './style.css';
import VideoControlIcon from './Icon';

const OfferModal = ({name, id, onAccept, onReject, active}) => {

    return  active ? 
    (
        <div className="modal-container">

            <div className="modal-content">

                 <h2>Invitation Recieved</h2>
                 <p>{name}</p>
                <div className="video-controls-row">

                    <VideoControlIcon blue onClick={onAccept} name="check"/>
                    <VideoControlIcon red onClick={onReject} name="times"/>

                </div>

            </div>

        </div>
    )
    :
    null

}

export default OfferModal;