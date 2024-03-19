import { useGLTF, useTexture } from '@react-three/drei'

export function Crocus(props) {
  const { nodes, materials } = useGLTF('/models/crocus.glb')

  const texture = useTexture('/textures/crocus.jpg')


// Flip the texture vertically
texture.flipY = false; 

  // Assign the texture to the material
  materials.crocus_petals.map = texture
  materials.crocus_pistill.map = texture
  materials.crocius_stem_transition.map = texture
  materials['crocus_stem.001'].map = texture; 


  return (
      <group {...props} dispose={null}>
      <group position={[0.5, 0, 0]} rotation={[Math.PI / 2, -0.153, 0.412]} scale={0.108}>
        <mesh geometry={nodes.Plane017.geometry} material={materials.crocus_petals} />
        <mesh geometry={nodes.Plane017_1.geometry} material={materials.crocus_pistill} />
        <mesh geometry={nodes.Plane017_2.geometry} material={materials.crocius_stem_transition} />
        <mesh geometry={nodes.Plane017_3.geometry} material={materials['crocus_stem.001']} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/crocus.glb')


