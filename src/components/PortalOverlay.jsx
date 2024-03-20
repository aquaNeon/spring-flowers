import { Html } from '@react-three/drei';

const PortalOverlay = ({ active, poem, placement, textStyle }) => {
  const textStyles = {
    position: 'absolute',
    top: placement.top,
    left: placement.left,
    color: textStyle.color,
    fontSize: textStyle.fontSize,
    fontFamily: textStyle.fontFamily,
    fontWeight: textStyle.fontWeight,

  };

  return (
    <Html>
      {active && (
        <div className="portal-text" style={textStyles}>
          {poem}
        </div>
      )}
    </Html>
  );
};

export default PortalOverlay;