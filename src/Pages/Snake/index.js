import React from 'react';

import Apple from '../../Assets/apple.png'
import Avacardo from '../../Assets/avacardo.png'
import Banana from '../../Assets/banana.png'
import Grapes from '../../Assets/grapes.png'
import Guava from '../../Assets/guava.png'
import Orange from '../../Assets/orange.png'
import PineApple from '../../Assets/pineapple.png'
import WaterMelon from '../../Assets/watermelon.png'
import Hungry from '../../Assets/hungry.webp'


import './style.css';

const foodImages = [Apple,Avacardo,Banana,Grapes,Guava,Orange,PineApple,WaterMelon]


class Snake{
    height= 0;
    width = 0;
    speed = 0;
    canvas= null;
    dx=0;
    dy=0;
    direction= 'right';
    score=0;
    gameOver= false;
    updateScore = null;
    maxTailLength = 20;
    prevLocations = [];
    foodLocations=[];
    foodWidth=70;
    foodHeight=70;
    collidedImageIndex=0;

    constructor(height,speed,canvas,updateScore){
      this.width = height;
      this.height = height;
      this.speed = speed;
      this.canvas = canvas;
      this.updateScore = updateScore;
      
      foodImages.forEach(() => {
        this.foodLocations.push({
            x: Math.random() * window.innerWidth - this.height ,
            y: Math.random() * window.innerHeight -this.height ,
        })
        
       })

      this.move();

      window.addEventListener('keydown',(event) => {
          const {key} = event;

          switch(key){
            case 'ArrowLeft': 
                this.direction = this.direction === 'up' || this.direction === 'down' ? 'left' :this.direction;
                break;

            case 'ArrowRight': 
                this.direction = this.direction === 'up' || this.direction === 'down' ? 'right' :this.direction;
                break;

            case 'ArrowUp':
                this.direction = this.direction === 'left' || this.direction === 'right' ? 'up' :this.direction;
                break;

            case 'ArrowDown': 
                this.direction = this.direction === 'left' || this.direction === 'right' ? 'down' :this.direction; 
                break;
        }

      })
    }

    move = () =>{

      this.canvas.clearRect(0,0,window.innerWidth,window.innerHeight)
       
      //    snake
      this.drwaTraces();
        this.canvas.fillStyle = 'white'
        switch(this.direction){
            case 'left': this.dx -= this.speed; break;
            case 'right': this.dx += this.speed; break;
            case 'up': this.dy -= this.speed; break;
            case 'down': this.dy += this.speed; break;
        }

        const newImage = new Image();
        newImage.src = Hungry;
        this.canvas.drawImage(newImage, this.dx-10, this.dy-10, 40, 40);

        //  food

        foodImages.forEach((image,index) => {
            const newImage = new Image();
            newImage.src = image;
           const {x,y} =  this.foodLocations[index];
            this.canvas.drawImage(newImage, x, y,this.foodWidth,this.foodHeight);
        })

        // const {x, y} = this.foodLocation;
        // this.canvas.fillStyle = 'red';
        // this.canvas.fillRect(x,y, 20, 20);
          

        //  logic
        this.setPrevLoactions();
        if(this.isColliding()){
            this.setFood(this.collidedImageIndex);
            this.score++;
            this.maxTailLength += 10;
            this.updateScore();
            console.log("====collided===")
        }
        
        this.detectWallCollision();
        
        if(!this.gameOver){
     window.requestAnimationFrame(this.move)
        }
    }

    setPrevLoactions = () => {

        if(this.prevLocations.length === this.maxTailLength ){
            this.prevLocations.shift();
        }
        this.prevLocations.push({x:this.dx,y:this.dy})
          
    }

    drwaTraces = () => {
        this.canvas.fillStyle = 'rgba(255,255,255,0.4)';

        this.prevLocations.forEach((item) => {
            this.canvas.fillRect(item.x, item.y, this.width, this.height);
        })
       
    }


    setFood = (index = null) => {
   
  
        this.foodLocations[index] = {
            x: Math.random() * window.innerWidth - this.height ,
            y: Math.random() * window.innerHeight -this.height ,
        }
    
        
        
    }

    isColliding = () => {

        let collided = false;

        for(let i =0 ; i<this.foodLocations.length; i++){
            const {x,y} = this.foodLocations[i];
            // console.log("*******",x,y)
            const xDistance = Math.pow(this.dx - x,2);
            const yDistance = Math.pow(this.dy - y,2);
            const distance= Math.sqrt(xDistance + yDistance);
            // console.log("====",distance)
            if( distance <= this.foodWidth-20){
                collided = true;
                this.collidedImageIndex = i;
                break;
            }
        }
       
     
          
        return collided ;
    }

    detectWallCollision = () => {

        let collided = false;
        const {innerWidth,innerHeight} = window


        switch(this.direction){
            case 'left': 
            collided =  this.dx - 0 === 0 ? true : false
            break;

            case 'right': 
            collided =  innerWidth - this.dx  === 0 ? true : false;
            break;

            case 'up': 
            collided = this.dy - 0 === 0 ? true : false;
             break;

            case 'down': 
            collided =   innerHeight - this.dy  === 0   ? true : false;
             break;
        }


        if(collided)
        {
        this.stopGame();
        }
    }

    stopGame = () => {
        this.gameOver= true;
    }
}

class SnakeGame extends React.Component{

    constructor(props){
        super(props);
        this.state={
        score:0
        }

        this.canvas = React.createRef();
    }

    componentDidMount(){
        const canvas = this.canvas.current.getContext('2d');
        new Snake(20,2,canvas,this.updateScore);
    }

    updateScore = () => {
      this.setState((prevState) => ({
        score: prevState.score + 1
      }))
    }

   

    render(){
        return(
            <>
            <canvas width={window.innerWidth} height={window.innerHeight} ref={this.canvas} className="canvas-container">

            </canvas>
            <div className="score-box">
        <h1>Score: {this.state.score}</h1> 
            </div>
            </>

        )
    }
}

export default SnakeGame;