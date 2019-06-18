import React from 'react';
import { Line } from 'rc-progress';

export default class progress extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      msPassed: 0
    }
  }

  componentDidMount(){
    const { maxTime, intervalTime} = this.props

    var i = setTimeout(()=>{
      this.clearIn();
      clearTimeout(i);
    },maxTime)

    var idInterval = setInterval(()=>{
      var a = this;

      this.setState({ msPassed: this.state.msPassed+intervalTime, id: i })
    },intervalTime)
  }

  clearIn = () => {
    clearInterval(this.state.idInterval)
  }

  componentWillReceiveProps(props){
    if(this.state.id){
      clearTimeout(this.state.id)
    }
    this.setState({ msPassed: 0 })
  }

  render(){

    const { maxTime, intervalTime} = this.props
    const perc = this.state.msPassed>0 ? (100*this.state.msPassed/maxTime) : 0;

    return (
      <Line percent={perc} strokeWidth="2" strokeColor="#009688" />
    )
  }
}
