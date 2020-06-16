import React from 'react';

import Bird from '../../Assets/orange.png'
import './style.css'

class Flappy {

    canvas = null;
    pipesLocations = [];
    maxYDistance = 200;
    maxXDistance = 250;
    maxTileWidth=30;
    divideItem = 2;
    birdX=10;
    birdY=window.innerHeight/2;
    birdWidth=100;
    birdHeight=100;
    gravity=10;
    maxPush = 50;
    onOver = null
    gaveOver = false;
    

    constructor(canvas,onOver){
        this.canvas = canvas;
        this.onOver = onOver;

         this.image= new Image();
         this.image.src= Bird;
        this.placePipes();
        this.draw();

        window.addEventListener('keydown',(event) => {
            const {key} = event;
            switch(key){
                case 'ArrowLeft': 
                    this.birdX -= this.maxPush;
                    break;
    
                case 'ArrowRight': 
                this.birdX += this.maxPush;
                    break;
    
                case 'ArrowUp':
                    this.birdY -= this.maxPush;
                    break;
    
                case 'ArrowDown': 
                this.birdY += this.maxPush;
                    break;
            }
        })
    }





    draw = () => {
        this.canvas.clearRect(0,0,window.innerWidth,window.innerHeight);


        // this.canvas.strokeStyle = 'white';
        //   //  this.canvas.fillRect(this.birdX,this.birdY, this.birdWidth, this.birdHeight);
        
       // this.canvas.strokeRect(this.birdX,this.birdY, this.birdWidth, this.birdHeight);
        this.canvas.drawImage(this.image,this.birdX,this.birdY,this.birdWidth,this.birdHeight);


        this.pipesLocations.forEach((item) => {
            const {firstTileLength, secondTileLength, xDistance} = item;
            this.canvas.fillStyle = 'red';
            this.canvas.fillRect(xDistance,0, this.maxTileWidth, firstTileLength);
            this.canvas.fillStyle = 'blue';

            this.canvas.fillRect(xDistance,firstTileLength +this.maxYDistance, this.maxTileWidth, secondTileLength);
        })

        this.makeBirdFall();
        this.movePieps();

        if(this.isCollided()){
            this.onOver()
            this.gaveOver = true;
        }
        if(!this.gaveOver){
        requestAnimationFrame(this.draw);
        }
    }

    placePipes = () => {
         let firstX = Math.trunc(window.innerWidth/5);
         
        for(let i =0; i<8 ; i++){
            const firstTileLength = Math.trunc(window.innerHeight/this.divideItem - (Math.random() * 100));
            this.pipesLocations.push({
                firstTileLength,
                secondTileLength: window.innerHeight - firstTileLength - this.maxYDistance,
                xDistance: firstX ,

            })
            firstX += this.maxXDistance;
            this.toogleDivideItem();
        }

    }

    movePieps = () => {
        for(let i =0; i<8 ; i++){
            this.pipesLocations[i].xDistance -= 1;
        }
        this.addPipes();
        
    }


    addPipes = () => {

        if(this.pipesLocations[0].xDistance === -this.maxTileWidth){
            this.pipesLocations.shift();
            const firstTileLength = Math.trunc(window.innerHeight/this.divideItem - (Math.random() * 100));
            this.pipesLocations.push({
                firstTileLength,
                secondTileLength: window.innerHeight - firstTileLength - this.maxYDistance,
                xDistance: this.pipesLocations[this.pipesLocations.length-1].xDistance + this.maxXDistance ,
    
            })

            this.toogleDivideItem();

        }

        

    }

    toogleDivideItem = () => {
        if(this.divideItem === 2){
            this.divideItem = 3
        }else{
            this.divideItem = 2;
        }
    }


    makeBirdFall = () => {
        this.birdY += 1;
    }

    isCollided = () => {

        let collided = false;

        for(let i=0; i< this.pipesLocations.length; i++)
        {

            if(this.birdX > this.pipesLocations[i].xDistance){
                continue;
            }

            const {firstTileLength, xDistance} = this.pipesLocations[i];

        const tile1Collided= Math.abs(this.birdX-xDistance)<= this.birdWidth-20 && this.birdY <= firstTileLength;

        const tile2Collided= Math.abs(this.birdX-xDistance)<= this.birdWidth-20 && this.birdY +this.birdHeight >= firstTileLength + this.maxYDistance;

        if(tile1Collided || tile2Collided){
            collided = true;
            break;
        }

        }

        return collided;
        

    }

}


class FlappyBird extends React.Component{

    constructor(props){
        super(props);
        this.state={
         over:false
        }
        this.canvasRef = React.createRef();
    }

    componentDidMount(){

        const canvas = this.canvasRef.current.getContext('2d');
        new Flappy(canvas,this.overTheGame);

    }

    overTheGame = () => {
        this.setState({
            over: true
        })
    }

    render(){
        return(

            <>
            <canvas 
             ref={this.canvasRef}
             className="canvas-container"
             width={window.innerWidth} 
             height={window.innerHeight}
              >
              </canvas>


              { 
                  this.state.over &&

              <div className="gave-over" >
                <h1>Game Over</h1>
              </div>
              }
              </>

        )
    }
}

export default FlappyBird;