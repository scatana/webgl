import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const GLCanvas = (props) => {
  const { width, height, setGlContext } = props;
  const canvasRef = useRef(null);

  useEffect(() => {
    const gl = canvasRef.current.getContext('webgl');

    setGlContext(gl);
  });

  return (
    <canvas
      width={width}
      height={height}
      ref={canvasRef}>
    </canvas>
  );
};

GLCanvas.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  setGlContext: PropTypes.func
}

GLCanvas.defaultProps = {
  width: 640,
  height: 480,
  setGlContext: () => {}
}

export default GLCanvas;
