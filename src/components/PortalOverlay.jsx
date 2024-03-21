import { Html } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';

const PortalOverlay = ({ active, poem, placement, textStyle, paragraph }) => {
  const { camera, viewport } = useThree(); // gets viewport to fix text 
  const groupRef = useRef(); // used to attach html text 

  // always face the screen 
  useEffect(() => {
    const groupRefCopy = groupRef.current;
    camera.add(groupRefCopy);
    return () => {
      camera.remove(groupRefCopy);
    };
  }, [camera]);

  const textStyles = {
    top: placement.top,
    left: placement.left,
    color: textStyle.color,
    fontSize: textStyle.fontSize,
    fontFamily: textStyle.fontFamily,
    fontWeight: textStyle.fontWeight,
  };


  return (
<group ref={groupRef} position={[placement.left, placement.top, -5]}>
      <Html className="box-style" style={textStyles}>
        {active && (
          <div className="portal-text">
            <h1>{paragraph}</h1>
            <div>{poem.split('\n').map((line, index) => (
              <p className="poem-text" key={index}>{line}</p>
              ))}
              </div>
          </div>
        )}
      </Html>
    </group>
  );
};

export default PortalOverlay;
