import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { HomeView, HowToView, SettingsView, BoardView } from 'Views'
import './App.css'

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/">
          <HomeView />
        </Route>
        <Route exact path="/board">
          <BoardView />
        </Route>
        <Route exact path="/how-to">
          <HowToView />
        </Route>
        <Route exact path="/settings">
          <SettingsView />
        </Route>
      </Router>
    </div>
  )
}

export default App
