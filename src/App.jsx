import Scene from './components/canvas/Scene'
import Hero from './components/sections/Hero'
import Experience from './components/sections/Experience'
import Projects from './components/sections/Projects'
import TechStack from './components/sections/TechStack'
import Contact from './components/sections/Contact'

function App() {
  return (
    <>
      {/* Fixed 3D background */}
      <Scene />

      {/* Scrollable HTML overlay */}
      <div id="scroll-container">
        <Hero />
        <Experience />
        <Projects />
        <TechStack />
        <Contact />
      </div>
    </>
  )
}

export default App
