import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import styles from './GLCanvas.css';

const GLCanvas = (props) => {
  const { width, height, fullScreen, setGlContext } = props;
  const canvasRef = useRef(null);

  useEffect(() => {
    const gl = canvasRef.current.getContext('webgl' || 'experimental-webgl');

    setGlContext(gl);
  });

  return (
    <canvas
      className={fullScreen && styles.fullScreen}
      width={!fullScreen && width}
      height={!fullScreen && height}
      ref={canvasRef}>
    </canvas>
  );
};

GLCanvas.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  fullScreen: PropTypes.bool,
  setGlContext: PropTypes.func
}

GLCanvas.defaultProps = {
  width: 640,
  height: 480,
  fullScreen: false,
  setGlContext: () => {}
}

export default GLCanvas;
