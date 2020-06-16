import React from 'react';

import './style.css';

const CANVAS_WIDTH = 300;
const CANVAS_HEIGHT = 100;

class Buffer extends React.Component{

    constructor(props){
        super(props);
        this.state={

        }

        this.audio = React.createRef();
        this.canvas = React.createRef();
    }

    onAudioTimeUpdated = () => {



        const {buffered, duration} = this.audio.current;

        for(let i=0; i< buffered.length; i++){
            console.log("==duration===",duration)

            console.log({start:buffered.start(i), end:buffered.end(i)})
            const x =  (buffered.start(i) /duration) * CANVAS_WIDTH ;
            const y = 0;
            const width = ((buffered.end(i)- buffered.start(i))/ duration) * CANVAS_WIDTH  ;
            const height = CANVAS_HEIGHT;
            this.drawRect(x,y, width, height)
        }
    }


    drawRect = (x,y, width, height) => {
       const canvas =  this.canvas.current.getContext('2d');
       canvas.fillStyle = "red";
       canvas.fillRect(x, y, width, height);
    }

    render(){
        return(

            <div>
                <video controls onProgress={this.onAudioTimeUpdated} ref={this.audio} src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'/>
                <canvas className="canvas" ref={this.canvas} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
            </div>

        )
    }
}

export default Buffer;