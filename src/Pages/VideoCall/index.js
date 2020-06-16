import React, { useRef, useEffect, useState, useCallback } from 'react';


import VideoControlIcon from './Icon';
import useRCTConnection from './useRCTConnection';

import './style.css';
import OfferModal from './OfferModal';


const createRandomId = (noOfDigits = 6) => {
    let id = '';
    for(let i =0; i< 6; i++){
        id = id + `${Math.floor(Math.random() * 100)}`
    }

    return id;
}

let localStream = null;
let userId = createRandomId();
let offerRecieved = false;




/**
 * 0. create a RCT peer connection
 * 1. create offer to send
 * 2. send the offer
 * 3. accept the offer and send back the configuration
 * 4. on recieving the offer accepted configure client peer connecction description with the offer sent
 * 5. create event handler to sent ice-candidate to start transporting data
 * 6. add the ice candidate came across the network
 * 7. listne to tracks coming over the network
 */

const VideoCall = () => {
   
    const videoRef = useRef();
    const clientVideoRef = useRef();

    const [isVideoOn, setVideoOn] = useState(false);
    const [isAudioOn, setAudioOn] = useState(false);
    const [isFrontCamera, setFrontCamera] = useState(true);
    const [imageBlobs, setBlobs] = useState([]);
    const [userName, setUserName] = useState('');
    const [callStarted, setCallStarted] = useState(false);
    const [offerRecieved, setofferRecieved] = useState({status: false, name: '', id: ''});


    const onConnectionEstablished = useCallback(() =>{
       setCallStarted(true);
    }, [])

    const onConnectionClosed = useCallback(() =>{
        setCallStarted(false);
     }, [])

    const onConnectionError = useCallback((err) => {

    }, [])

    const {sendInvitation, closeVideoCall, acceptInvitation, rejectInvitation} = useRCTConnection({clientVideoRef, isVideoOn, isAudioOn, userName, userId, onConnectionError, onConnectionEstablished, onConnectionClosed, setofferRecieved, offerRecieved})




   

     useEffect(() => {

        if(!isAudioOn && !isVideoOn){

            if(videoRef.current){
            videoRef.current.srcObject = null;
            }

            if(localStream){
            localStream.getTracks()[0].stop();
            }
            localStream = null;

            return;
        }


        const contraints = {
            video: isVideoOn , 
            audio: isAudioOn,
        }


        if(navigator.mediaDevices){
            navigator.mediaDevices.getUserMedia(contraints)
            .then((stream) => {
                localStream =stream;
                videoRef.current.autoplay = true;
                videoRef.current.srcObject = stream;
            
            })
            .catch((err) => {
                console.log("=====error====",err)
            })


        }
    }, [isVideoOn, isAudioOn, localStream])


 



  


   

    const takePhoto = useCallback(() => {
        if(!localStream){
            return;
        }
        const track = localStream.getVideoTracks()[0];
        const imageCapture = new ImageCapture(track);
        imageCapture.takePhoto().then((blob) => {
        setBlobs([ URL.createObjectURL(blob),...imageBlobs]);
        })
    }, [imageBlobs, localStream])


    const toogleVideo = useCallback(() => {
        setVideoOn((prevValue) => !prevValue );
    },[])

    const toogleAudio = useCallback(() => {
        setAudioOn((prevValue) => !prevValue )
    },[])


    const onNameChange = useCallback((e) => {
     setUserName(e.target.value);
    },[])


    return(

        <div className="video-container">
            <div className="image-row">
                    {
                        imageBlobs.map((blob) => {
                            return <img key={blob}  src={blob} alt="user image"/>
                        })
                    }
            </div>
        
            <div className="video-content">

               {
                !callStarted &&
                <input placeholder="Enter user name" onChange={onNameChange} value={userName} className="input-elem"  />
               }

               
                <video  ref={clientVideoRef} style={{display: callStarted ? 'block': 'none'}} className="video-elem" />
               

                {
               callStarted &&
                 <video  className="self-video-elem" ref={videoRef}/>
                }
                

                <div className="video-controls-row">

                    {
                     callStarted ?

                    <>
                        <VideoControlIcon onClick={toogleVideo}  active={isVideoOn} name={isVideoOn ? 'video-slash'  : 'video'}/>
                        <VideoControlIcon onClick={toogleAudio}  active={isAudioOn} name={isAudioOn ? 'volume-mute'  : 'volume-up'}/>
                        <VideoControlIcon onClick={takePhoto}  blue name='camera'/>
                        <VideoControlIcon onClick={closeVideoCall}  red name='times'/>
                    </>
                    :
                        <VideoControlIcon onClick={sendInvitation}  blue name='paper-plane'/>
                        
                    }



                    
                </div>

                <OfferModal 
                active={offerRecieved.status}
                name={offerRecieved.name}
                onAccept={acceptInvitation}
                onReject={rejectInvitation}
                />
                
               
            </div>
        </div>
    )
}

export default VideoCall;