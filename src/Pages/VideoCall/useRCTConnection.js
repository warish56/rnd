import React, { useCallback , useState, useEffect} from 'react';
import useSocket from './useSocket';


let myPeerConnection = null;
let recievedOffer = null;
let clientStream = null;

const useRCTConnection = ({clientVideoRef, isVideoOn, isAudioOn, userName, userId, onConnectionEstablished, onConnectionError, onConnectionClosed, setofferRecieved, offerRecieved}) => {

    const socket = useSocket();
    const [users, setUsers] = useState({});


       //  creating offer
       const handleNegotiaitionEvent = () => {

        if(offerRecieved.status){
             return;
        }

        myPeerConnection.createOffer()
          .then((offer) =>  {
              return myPeerConnection.setLocalDescription(offer)
           })
           .then(() => {
                    //   client A sending offer to client B
                    socket.emit('video-offer', {name:userName, id: userId, description:myPeerConnection.localDescription });
           })

       }

    const handleIceCandidateEvent = (event) => {
        // if(offerRecieved){
        //     return;
        // }

        socket.emit('new-ice-candidate', {name:userName, id: userId, candidate: event.candidate});

    }

    const handleTrackEvent = (event) => {
        clientVideoRef.current.autoplay = true;
        clientVideoRef.current.srcObject = event.streams[0]
     }
 
    
    const createPeerConnection = useCallback(() => {
        //  0. creating a RCT peer connection
       myPeerConnection =  new RTCPeerConnection({
                                                   iceServers: [{
                                                      urls: "stun:stun.services.mozilla.com",
                                                    }]
                                                 })      

   myPeerConnection.ontrack = handleTrackEvent;
   myPeerConnection.onnegotiationneeded = handleNegotiaitionEvent;
   myPeerConnection.onicecandidate = handleIceCandidateEvent;

   }, [myPeerConnection, handleTrackEvent, handleIceCandidateEvent, handleNegotiaitionEvent])


const setMediaDevice = useCallback(() => {
    return navigator.mediaDevices.getUserMedia({video:true, audio:false})
    .then(function(localStream) {
        clientStream = localStream;
      clientVideoRef.current.srcObject = localStream;
      localStream.getTracks().forEach(track => myPeerConnection.addTrack(track, localStream));
    })
}, [])



const acceptInvitation = useCallback(() => {

    console.log({name:recievedOffer.name})

    createPeerConnection();
    const desc = new RTCSessionDescription(recievedOffer.description);
    myPeerConnection.setRemoteDescription(desc)
    .then(() => {
        //  adding tracks to RCT connection
        return setMediaDevice();
    })
    .then(() => {
            return  myPeerConnection.createAnswer();
    })
    .then((answere) => {
            return myPeerConnection.setLocalDescription(answere);
    })
    .then(() => {
            socket.emit('video-answere', {name:userName || 'abcd', id: userId, description:myPeerConnection.localDescription });
            setUsers((prevValue) => ({...prevValue, [recievedOffer.id]: recievedOffer.name}));
            setofferRecieved((prevValue) =>({...prevValue,status: false}));
            onConnectionEstablished();
    })
}, [recievedOffer,myPeerConnection, userName, userId, onConnectionEstablished])


const rejectInvitation = useCallback(() => {
    recievedOffer = null;
    setofferRecieved({status: false, name: '', id: '',});
}, [setofferRecieved]);


const closeVideoCall = useCallback((emitMeesage= true) => {

 

   
    //  this line actually closes the camera
    clientStream.getVideoTracks()[0].stop();


    clientVideoRef.current.srcObject.getTracks().forEach((track) => track.stop() );
 
    if(emitMeesage){
    socket.emit('hang-call', {sourceClientId: userId, sourceClientName: userName || 'abcd'});
    }

    


    clientVideoRef.current.removeAttribute("src");
    clientVideoRef.current.removeAttribute("srcObject");

    if(clientStream.stop){
        clientStream.stop()
    }
    

    myPeerConnection.oniceconnectionstatechange = null;
    myPeerConnection.onsignalingstatechange = null;
    myPeerConnection.onicegatheringstatechange = null;
    myPeerConnection.onremovetrack = null;
    myPeerConnection.onremovestream = null;
    myPeerConnection.onicecandidate = null;
    myPeerConnection.onnegotiationneeded = null;

    myPeerConnection.close();

    onConnectionClosed();


 

   setTimeout(() => {
    myPeerConnection = null;
    clientStream = null;
   },2000)
 
 },[myPeerConnection, clientVideoRef, socket, onConnectionClosed])


   useEffect(() => {

    if(!socket){
        return;
    }

    //  client B accepting video offer and sending an answere
      socket.on('video-offer', ({name, id, description}) => {
            console.log("====incoming offer====")
            // offerRecieved = true;
            recievedOffer = {
                name,
                id,
                description
            } 
            setofferRecieved({status: true, name, id,});
           
      })


      //    client A on recieving an answere from client B
      socket.on('video-answere', ({name, id, description}) => {
        const desc = new RTCSessionDescription(description);
        myPeerConnection.setRemoteDescription(desc)
        setUsers((prevValue) => ({...prevValue, [id]: name }) )
        onConnectionEstablished();
    })

    socket.on('new-ice-candidate', ({name, id, candidate}) => {
        if(!candidate){
            return;
        }

        if(!myPeerConnection){
            createPeerConnection();
        }
        const candid = new RTCIceCandidate(candidate)
        myPeerConnection.addIceCandidate(candid);

    });

    socket.on('hang-call', ({sourceClientName, sourceClientId}) => {
      closeVideoCall(false);
    })


}, [socket, myPeerConnection, setofferRecieved, createPeerConnection, closeVideoCall]);






const invite = useCallback(() => {
    if(!userName || !userId){
        return;
    }
    createPeerConnection();
    setMediaDevice();
},[createPeerConnection,myPeerConnection, setMediaDevice, userId, userName])

return {sendInvitation: invite, users, closeVideoCall, acceptInvitation, rejectInvitation};

}


export default useRCTConnection;