import React from 'react'
import './App.less'
import Hello from './components/Hello'
import Home from './components/Home'
import Setting from './components/Setting'

const App = () => {
  return (
    <div className="app">
      <Home />
      <Setting />
      <Hello />
    </div>
  )
}

export default App
