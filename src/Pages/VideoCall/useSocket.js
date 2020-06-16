import React, {useEffect, useState} from 'react';

import io from 'socket.io-client';


const useSocket = () => {

    const [socket, setSocket] = useState(null)

    useEffect(() => {
        const s = io('http://192.168.0.3:8000');
            s.on('connect', () => {
            console.log("====connected====",s.connected);
            console.log('===id 1===',s.id);
            setSocket(s);
            });

    }, []);


    return socket;


}

export default useSocket;