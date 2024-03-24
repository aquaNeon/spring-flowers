import './index.css';
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { Experience } from "./components/Experience.jsx";
import { LoadingScreen } from "./components/LoadingScreen.jsx";

function App() {
  const [start, setStart] = useState(false)
  const ambience = new Audio('/audio/ambiance.mp3')
  ambience.volume = 0.5

  useEffect(() => {
    const handleEnded = () => {
      ambience.play()
    }
    
    if (start) {
      ambience.play()
      ambience.addEventListener('ended', handleEnded)
    }
  
    return () => {
      ambience.removeEventListener('ended', handleEnded)
    }
  }, [start])

  return (
    <>
      <div id="root" className={start ? "background-default" : "background-image"}>
        <Canvas className="canvas-container" shadows camera={{ position: [0, 0, 10], fov: 30 }} >
          <Suspense fallback={null}>
            {start && <Experience />}
          </Suspense>
        </Canvas>
      </div>
      <LoadingScreen started={start} onStarted={() => setStart(true)} />
    </>
  )
}

export default App;
