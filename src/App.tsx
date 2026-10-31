import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Title from './Title'
import Bio from './Bio'
import Projects from './Projects'
import Contact from './Contact'

function App() {
  
  return (
    <>
    <Title />
    <Bio />
    <Projects />
    <Contact />
    </>
  )
}

export default App
