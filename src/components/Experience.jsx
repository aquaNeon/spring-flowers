import { CameraControls, Environment, MeshPortalMaterial, RoundedBox, Text, useCursor, useTexture } from '@react-three/drei';
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
    useCursor(hovered)
    const camControlRef = useRef()
    const scene = useThree((state) => state.scene)
    const InstrumentSerifRegular = './font/InstrumentSerif-Regular.ttf' 

    // extra hoverstate to show pointer on each flower 
    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto';
    }, [hovered]);

    //animate camera
    useEffect(() => {
        if (active) {
            const targetPosition = new THREE.Vector3();
            scene.getObjectByName(active).getWorldPosition(targetPosition);
            camControlRef.current.setLookAt(
                0,
                0,
                5,
                targetPosition.x,
                targetPosition.y,
                targetPosition.z,
                true
            );
        } else {
            camControlRef.current.setLookAt(
                0,
                0,
                10,
                0,
                0,
                0,
                true
            );
        }
    }, [active])

    return (
        <> 
        {/* Lighting */}
            <ambientLight intensity= {2.5}/>
            <Environment preset="sunset" />

        {/* FLowers refactored */}
            <FlowerStage 
                name={"Crocus"}
                paragraph={"Crocus Sativus"}
                poem={""}
                color={"white"} 
                texture={'textures/sphere_crocus.jpg'} 
                position={[ 0, 0, -1]} 
                active = {active}
                setActive={setActive}
                setHovered={setHovered}
                onPointerEnter={() => setHovered(true)}
                onPointerLeave={() => setHovered(false)}
                >
                <Crocus 
                    scale={2.3} 
                    position={[-1.2, -1, 0 ]}
                    onPointerEnter={() => setHovered(true)} 
                    onPointerLeave={() => setHovered(false)}
                /> 
            </FlowerStage>

            <FlowerStage 
                name={"Tussilago"}
                paragraph={"Tussilago Farfara"}
                poem={""}
                color={"#58421a"} 
                texture={'textures/sphere_tussilago.jpg'} 
                position-x={-2.5} 
                rotation-y={Math.PI/8}
                active = {active}
                setActive={setActive}
                setHovered={setHovered}
                onPointerEnter={() => setHovered(true)}
                onPointerLeave={() => setHovered(false)}
                >
                <Tussilago 
                    scale={2.5} 
                    position={[0, -1, 0 ]}
                    onPointerEnter={() => setHovered(true)} 
                    onPointerLeave={() => setHovered(false)}
                    /> 
            </FlowerStage>

            <FlowerStage 
                name={"Wood Anemone"}
                paragraph={"Anemonoides Nemorosa"}
                poem={""}
                color={"#587762"} 
                texture={'textures/sphere_vitsippa.jpg'} 
                position-x={2.5} 
                rotation-y={-Math.PI/8}
                active = {active}
                setActive={setActive}
                setHovered={setHovered}

                >
                <Vitsippa 
                    scale={2.5} 
                    position={[-1.3, -1, 0 ]} 
                    onPointerEnter={() => setHovered(true)} 
                    onPointerLeave={() => setHovered(false)}
                /> 
            </FlowerStage>

            <CameraControls 
                ref={camControlRef} 
                maxPolarAngle={Math.PI/2} 
                minPolarAngle={Math.PI/6} 
                minDistance={1.5} 
                maxDistance={15}
                /> 

            {/* Text for portals  */}
            <PortalOverlay
                active={active}
                poem={
                    active === "Crocus" ? "Purple crocus smiles\nIts greeting gives me hope\nSpring will soon be here\n. \nCarol Shelton" : 
                    active === "Tussilago" ? "The light of a candle\nIs transferred to another candle\n Spring twilight\n  .  \n Yosa Buson" : 
                    active === "Wood Anemone" ? "The white bush clovers\nDrop the dewdrops \nFrequently\n  .  \n Masaoka Shiki" : ""}
                placement={
                    active === "Crocus" ? { top: '0%', left: '0%' } :
                    active === "Tussilago" ? { top: '0%', left: '0%' } : 
                    active === "Wood Anemone" ? { top: '0%', left: '0%' } : ""}
                textStyle={
                    active === "Crocus" ? { color: '#8585bd'} : 
                    active === "Tussilago" ? { color: '#927348' } : 
                    active === "Wood Anemone" ? { color: '#627765' } : ""}
                paragraph={
                    active === "Crocus" ? "Crocus Sativus" : 
                    active === "Tussilago" ? "Tussilago Farfara" : 
                    active === "Wood Anemone" ? "Anemonoides Nemorosa" : ""}
            />        
</>
    )
}


const FlowerStage = ({children, texture, name, color, paragraph, active, setActive, hovered, setHovered, poem, ...props}) => {
    const map = useTexture(texture)
    const portalMaterialRef = useRef()
    const [clickSound] = useState(new Audio('/audio/click.mp3'))
    const [hoverSound] = useState(new Audio('/audio/pour.mp3'))
    const [enterSound] = useState(new Audio('/audio/birds.mp3'))
    
    useFrame((_state, delta) => {
        const portalOpen = active === name
        easing.damp(portalMaterialRef.current, "blend", portalOpen ? 1: 0, 0.2, delta)
    })

    const enterSoundRef = useRef(null);


        useEffect(() => {
            enterSoundRef.current = enterSound;
        }, [])

    useEffect(() => {
        if (enterSoundRef.current) {
            enterSoundRef.current.volume = 0.1
        }

        let fadeOutInterval = null;
        const fadeOut = () => {
            fadeOutInterval = setInterval(() => {
                if (enterSoundRef.current.volume > 0) {
                    enterSoundRef.current.volume -= 0.1
                } else {
                    clearInterval(fadeOutInterval)
                    enterSoundRef.current.pause()
                }
            }, 100)
        };

        return () => {
            clearInterval(fadeOutInterval);
        };
    }, [active])

    //Enter or exit portals, handle sounds
    const handleClick = () => {
        if (!active || active === name) {
            setActive(active === name ? null : name);
            enterSoundRef.current.currentTime = 0;
            enterSoundRef.current.play();
            clickSound.play();
            setTimeout(() => {
                clickSound.currentTime = 0;
                clickSound.pause();
            }, 1000); 
    
            setTimeout(() => {
                fadeOut();
            }, 1000); 
        }
    }

    //hover sounds 
    const handlePointerEnter = () => {
        if (!active) {
        hoverSound.currentTime = 0
        hoverSound.play()
        setHovered(true)
        }
    };

    const handlePointerLeave = () => {
        hoverSound.pause()
        hoverSound.currentTime = 0
        setHovered(false)
    };


    return (<group {...props}>
        {/* Text for potals  */}
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
            onDoubleClick={handleClick}
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


