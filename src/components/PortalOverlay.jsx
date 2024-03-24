import { Html } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';

const PortalOverlay = ({ active, poem, placement, textStyle, paragraph }) => {
  const { camera, viewport } = useThree() // gets viewport to fix text  on screen 
  const groupRef = useRef() // used to attach html text 

  // always face the screen 
  useEffect(() => {
    const groupRefCopy = groupRef.current
    camera.add(groupRefCopy)
    return () => {
      camera.remove(groupRefCopy)
    }
  }, [camera])

  const textStyles = {
    // top: placement.top,
    // left: placement.left,
    color: textStyle.color,
  }


  return (
  <group ref={groupRef} position={[placement.left, placement.top, -5]}>
        <Html style={textStyles}>
          {active && (
            <div className="portal-text">
              <div className="portal-wrapper">
                <h1>{paragraph}</h1>
                {/* splits poems  */}
                <div>{poem.split('\n').map((line, index) => (
                  <p className="poem-text" key={index}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Html>
  </group>
  )
}

export default PortalOverlay;
