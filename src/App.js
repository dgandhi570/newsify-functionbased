import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom'

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<News key="ll"/>}/>
          <Route exact path="/entertainment" element={<News key="a"category="entertainment"/>}/>
          <Route exact path="/general" element={<News key="v"category="general"/>}/>
          <Route exact path="/business" element={<News key="e"category="business"/>}/>
          <Route exact path="/health" element={<News key="w"category="health"/>}/>
          <Route exact path="/science" element={<News key="1"category="science"/>}/>
          <Route exact path="/sports" element={<News key="k"category="sports"/>}/>
          <Route exact path="/technology" element={<News key="p"category="technology"/>}/>
          {/* <Route exact path="/About" element={<About/>}/> */}
        </Routes>

    </Router>                   
      </div>
    )
  }
}










