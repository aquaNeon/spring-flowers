import { useGLTF, useTexture } from '@react-three/drei'

export function Vitsippa(props) {
  const { nodes, materials } = useGLTF('/models/vitsippa.glb')

  const texture = useTexture('/textures/vitsippa.jpg')
  // Flip the texture vertically
  texture.flipY = false; 
  
    materials.watercolro_whiyte.map = texture
    materials.tussilago_base.map = texture
    materials.vitsippa_pistill.map = texture

  return (
    <group {...props} dispose={null}>
      <group position={[0.526, 0, 0]} rotation={[-2.545, 0, 0]} scale={[0.036, 0.036, 0.063]}>
        <mesh geometry={nodes.Plane147.geometry} material={materials.watercolro_whiyte} />
        <mesh geometry={nodes.Plane147_1.geometry} material={materials.tussilago_base} />
        <mesh geometry={nodes.Plane147_2.geometry} material={materials.vitsippa_pistill} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/vitsippa.glb')
