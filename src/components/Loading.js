import React, { Component } from 'react'
import heart from './heart.gif'

export default class loading extends Component {
  render() {  
    return (
      <div style={{textAlign: "center"}}>
        <img src={heart} alt="loading"></img>
      </div>
    )
  }
}
