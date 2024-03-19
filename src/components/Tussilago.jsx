import { useGLTF, useTexture } from '@react-three/drei'


export function Tussilago(props) {
  const { nodes, materials } = useGLTF('/models/tussilago.glb')
  const texture = useTexture('/textures/tussilago2.jpg')


  // Flip the texture vertically
  texture.flipY = false; 
  
    materials.tussilaco_stem.map = texture
    materials.tussilago_petals.map = texture
    materials.tussilago_base.map = texture
    materials.tussi_pistils.map = texture

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Plane041.geometry} material={materials.tussilaco_stem} />
      <mesh geometry={nodes.Plane041_1.geometry} material={materials.tussilago_petals} />
      <mesh geometry={nodes.Plane041_2.geometry} material={materials.tussilago_base} />
      <mesh geometry={nodes.Plane041_3.geometry} material={materials.tussi_pistils} />
    </group>
  )
}

useGLTF.preload('/models/tussilago.glb')
