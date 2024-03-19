import './index.css';
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { Experience } from "./components/Experience.jsx";
import { LoadingScreen } from "./components/LoadingScreen.jsx";

function App() {
  const [start, setStart] = useState(false)
  const ambience = new Audio('/audio/ambience_low.mp3')

  useEffect(() => {
    const handleEnded = () => {
      // Restart the audio playback when it ends
      ambience.play();
    };
  
    if (start) {
      // Start playing the audio
      ambience.play();
  
      // Add an event listener for the "ended" event
      ambience.addEventListener('ended', handleEnded);
    }
  
    // Cleanup: remove the event listener when the component unmounts or when start becomes false
    return () => {
      ambience.removeEventListener('ended', handleEnded);
    };
  }, [start]);

  return (
    <>
      <div id="root" className={start ? "background-default" : "background-image"}>
        <Canvas className="canvas-container" shadows camera={{ position: [0, 0, 10], fov: 30 }}>
          <Suspense fallback={null}>
            {start && <Experience />}
          </Suspense>
        </Canvas>
      </div>
      <LoadingScreen started={start} onStarted={() => setStart(true)} />
    </>
  );
}

export default App;
