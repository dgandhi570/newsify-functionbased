
import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom'

export default class App extends Component {

  state = {progress: 0}

  setProgress = (progress) => {
    this.setState({progress: progress})
  }
  render() {
    return (
      <div>
        <Router>
        <Navbar />
        <LoadingBar
            height="2px"
            color='red'
            progress={this.state.progress}
            // onLoaderFinished={() => this.setState({progress: 0})}
          />
        <Routes>
          <Route exact path="/" element={<News setProgress={this.setProgress} key="ll"/>}/>
          <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="a"category="entertainment"/>}/>
          <Route exact path="/general" element={<News setProgress={this.setProgress} key="v"category="general"/>}/>
          <Route exact path="/business" element={<News setProgress={this.setProgress} key="e"category="business"/>}/>
          <Route exact path="/health" element={<News setProgress={this.setProgress} key="w"category="health"/>}/>
          <Route exact path="/science" element={<News setProgress={this.setProgress} key="1"category="science"/>}/>
          <Route exact path="/sports" element={<News setProgress={this.setProgress} key="k"category="sports"/>}/>
          <Route exact path="/technology" element={<News setProgress={this.setProgress} key="p"category="technology"/>}/>
          {/* <Route exact path="/About" element={<About/>}/> */}
        </Routes>

    </Router>                   
      </div>
    )
  }
}










