import { CameraControls, Environment, MeshPortalMaterial, RoundedBox, Text, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { Crocus } from './Crocus.jsx';
import { Tussilago } from './Tussilago.jsx';
import { Vitsippa } from './Vitsippa.jsx';
import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { easing } from 'maath';
import PortalOverlay from './PortalOverlay';


export const Experience = () => {

    //enter portals 
    const [active, setActive] = useState(null)
    const [hovered, setHovered] = useState(null)
    const camControlRef = useRef()
    const scene = useThree((state) => state.scene)

    useEffect(() => {
        if (active) {
            const targetPosition = new THREE.Vector3()
            scene.getObjectByName(active).getWorldPosition(targetPosition)
            camControlRef.current.setLookAt(
                0, 
                0, 
                5,
                targetPosition.x,
                targetPosition.y,
                targetPosition.z,
                true,
            )
        }
        else {
            camControlRef.current.setLookAt(
                0, 
                0, 
                10,
                0,
                0,
                0,
                true,
            )
        }
    })
    return (
        <>            
            <ambientLight intensity= {2.5}/>
            <Environment preset="sunset" />

            <FlowerStage 
                name={"Crocus"}
                paragraph={"Crocus sativus"}
                poem={"Crocus sativus hej hej hej "}
                color={"white"} 
                texture={'textures/sphere_crocus.jpg'} 
                position={[ 0, 0, -1]} 
                active = {active}
                setActive={setActive}
                setHovered={setHovered}
                >
                
                <Crocus scale={2.3} position={[-1.2, -1, 0 ]}/> 
            </FlowerStage>

            <FlowerStage 
                name={"Tussilago"}
                paragraph={"Tussilago farfara"}
                poem={"Crocus sativus hej hej hej "}
                color={"#58421a"} 
                texture={'textures/sphere_tussilago.jpg'} 
                position-x={-2.5} 
                rotation-y={Math.PI/8}
                active = {active}
                setActive={setActive}
                setHovered={setHovered}
                >
                <Tussilago scale={2.5} position={[0, -1, 0 ]}/> 
            </FlowerStage>

            <FlowerStage 
                name={"Wood Anemone"}
                paragraph={"Anemonoides nemorosa"}
                poem={"Crocus sativus hej hej hej "}
                color={"#587762"} 
                texture={'textures/sphere_vitsippa.jpg'} 
                position-x={2.5} 
                // rotation-y={-Math.PI/8}
                active = {active}
                setActive={setActive}
                setHovered={setHovered}
                >

                <Vitsippa scale={2.5} position={[-1.3, -1, 0 ]}/> 
            </FlowerStage>

            <CameraControls ref={camControlRef} maxPolarAngle={Math.PI/2} minPolarAngle={Math.PI/8} minAzimuthAngle={-Math.PI/4} maxAzimuthAngle ={Math.PI/4}/> 

            {/* Text for portals  */}
            <PortalOverlay
                active={active}
                poem={active === "Crocus" ? "Crocus sativus hej hej hej" : active === "Tussilago" ? "Tussilago farfara hej hej hej" : active === "Wood Anemone" ? "Anemonoides nemorosa hej hej hej" : ""}
                placement={active === "Crocus" ? { top: '10%', left: '10%' } : active === "Tussilago" ? { top: '20%', left: '50%' } : active === "Wood Anemone" ? { top: '30%', left: '30%' } : { top: '10%', left: '0%' }}
                textStyle={active === "Crocus" ? { color: 'red', fontSize: '24px', fontFamily: 'Arial', fontWeight: 'bold' } : active === "Tussilago" ? { color: 'blue', fontSize: '20px', fontFamily: 'Helvetica', fontWeight: 'normal' } : active === "Wood Anemone" ? { color: 'green', fontSize: '18px', fontFamily: 'Times New Roman', fontWeight: 'normal' } : { color: 'black', fontSize: '16px', fontFamily: 'Arial', fontWeight: 'normal' }}
            />        
</>
    )
}


const FlowerStage = ({children, texture, name, color, paragraph, active, setActive, hovered, setHovered, poem, ...props}) => {
    const map = useTexture(texture)
    const portalMaterialRef = useRef()
    const [clickSound] = useState(new Audio('/audio/click.wav'))
    const [hoverSound] = useState(new Audio('/audio/bush.mp3'))

    useFrame((_state, delta) => {
        const portalOpen = active === name
        easing.damp(portalMaterialRef.current, "blend", portalOpen ? 1: 0, 0.2, delta)
    })


    const handlePointerEnter = () => {
        if (!active) {
        hoverSound.currentTime = 0
        hoverSound.play();
        setHovered(true)
        }
    };

    const handlePointerLeave = () => {
        hoverSound.pause()
        hoverSound.currentTime = 0
        setHovered(false)
    };


    return (<group {...props}>
            <Text font='./font/InstrumentSerif-Regular.ttf' fontSize={0.3} position={[-0.85, 1.25, 0.05]} anchorX={"left"}> 
            {name}
            <meshBasicMaterial color={color} toneMapped={false}/> 
            </Text>
            <Text font='./font/InstrumentSerif-Italic.ttf' fontSize={0.1} position={[-0.83, 1, 0.05]} anchorX={"left"}> 
            {paragraph}
            <meshBasicMaterial color={color} toneMapped={false}/> 
            </Text>

                <RoundedBox 
                name={name}
                args={[ 2, 3, 0.05 ]}
                onDoubleClick={() => {
                    setActive(active === name ? null : name)
                    clickSound.play() 
                    setTimeout(() => {
                        clickSound.currentTime = 0
                        clickSound.pause()
                    }, 1000);
                }}
                onPointerEnter={handlePointerEnter}
                onPointerLeave={handlePointerLeave}
                >
                    <MeshPortalMaterial
                        ref={portalMaterialRef}>
                        <ambientLight intensity= {2.5}/>
                        <Environment preset="sunset" />
                        {children}
                        <mesh rotation={[0, Math.PI, 0]}>
                            <sphereGeometry args={[9,32,32]}/>
                            <meshStandardMaterial map={map} side={THREE.BackSide}/>
                        </mesh>
                    </MeshPortalMaterial>
                </RoundedBox>

    </group>)

}


