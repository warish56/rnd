import React from 'react';

import Brick from './Brick';


import './style.css';
class Wall extends React.Component{


    constructor(props){
        super(props);
        this.state={
            bricks: [
                        {id:'1', name:'A'}, 
                        {id:'2', name:'B'}, 
                        {id:'3', name:'C'}, 
                        {id:'4', name:'D'},
                        {id:'5', name:'E'}, 
                        {id:'6', name:'F'}, 
                        {id:'7', name:'G'}, 
                        {id:'8', name:'H'},
                        {id:'9', name:'I'}, 
                        {id:'10', name:'J'}, 
                        {id:'11', name:'K'}, 
                        {id:'12', name:'L'},
                        {id:'13', name:'M'},
                        {id:'14', name:'N'}, 
                        {id:'15', name:'O'}, 
                        {id:'16', name:'P'}, 
                        {id:'17', name:'Q'},
                        {id:'18', name:'R'},
                   ],
            selectedBricks:{}
        }
    }


    toggleSelectBrick = (brickId) => {
       this.setState((prevState) => ({
           selectedBricks: {
               ...prevState.selectedBricks,
               [brickId]:  !prevState.selectedBricks[brickId] 
           }
       }))
    }

    render(){
        const {bricks, selectedBricks} = this.state;
        return(
            <div className="wall-container">

                {
                    bricks.map((brick) => {
                        return (
                                <Brick  
                                key={brick.id} 
                                id={brick.id}
                                isSelected={selectedBricks[brick.id]} 
                                name={brick.name}
                                onBrickToggle={this.toggleSelectBrick}
                                />
                        )
                    })
                }

            </div>

        )
    }
}

export default Wall;