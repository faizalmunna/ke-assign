import React, { Component } from 'react'
import Main from './components/Main'
import Nav from './components/Nav'
import Header from './components/Header'

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Header/>
        <div className="body">

            <Nav/>
            <Main/>
        </div>
      </div>
    );
  }
}



