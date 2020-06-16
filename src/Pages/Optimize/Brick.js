import React, {useMemo} from 'react';

import './style.css';

const getSum = () => {
    let sum = 0;
 for(let i=0; i<1000; i++){
    sum += i;
 }
 return sum;
}

const  Brick  = (props) =>{
        const {id,name, isSelected, onBrickToggle} = props;

        useMemo(() => {
            const sum = getSum();
            console.log("===value==== ",sum);

        },[isSelected])
        
        console.log("===rendered==== ",id);
        return(
            <button  onClick={() => onBrickToggle(id)} type="button" className='brick'>
             <span>{name}</span>

             {
                 isSelected &&
                    <div className="backdrop">
                        <i class="fas fa-check"></i>
                    </div>
             }

            </button>
        )
    
}

export default Brick;























// shouldComponentUpdate(nextProps, nextState){
//     if(nextProps.isSelected !== this.props.isSelected){
//         return true;
//     }
//     return false;
// }