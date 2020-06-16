import React, {useRef, useState, useEffect} from 'react';
import styles from './Home/Home.module.css'
import './App.css';
import RootPage from './Pages/RootPage';
import store from './Service'
import CarDetail from './Pages/CarDetail'
import Snake from './Pages/Snake'
import FlappyBird from './Pages/FlappyBird'
import Covid from './Pages/Covid'
import VideoCall from './Pages/VideoCall'
import Buffer from './Pages/Buffer'
import Optimize from './Pages/Optimize'

const usePrevious = (value) => {
console.log("===updated====",value)
  const ref = useRef(null);


  useEffect(() => {
    ref.current = value
    console.log("====setting====",ref.current)
  })

  return ref.current;
  

}

const Lipstick = function(target){
  target.lipsColor="pink"
}



class App extends React.Component {
  
  constructor(props){
    super(props);
    // store.setRefrence(this);
  }

  // const [counter,updateCounter] = useState(0);
  // const prev = usePrevious(counter);

  // console.log("====prev===",prev)
  // const updateCount = () => {
  //   updateCounter(counter+1)
  // }
  render(){
  return (

    <Optimize/>
  )
  }
}

export default App;
