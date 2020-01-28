import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import styles from './GLCanvas.css';

const GLCanvas = (props) => {
  const {
    width,
    height,
    setGl,
    fullScreen,
    vShaderSource,
    fShaderSource } = props;
  const canvasRef = useRef(null);

  useEffect(() => {
    // Get the WebGL context
    const gl = canvasRef.current.getContext('webgl' || 'experimental-webgl');

    // Adjust the viewport so that it covers the entire canvas
    gl.viewport(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Pass the WebGL context to the parent
    setGl(gl);
  });

  return (
    <canvas
      width={width}
      height={height}
      className={fullScreen ? styles.fullScreen : null}
      ref={canvasRef}>
      Your browser does not support WebGL.
    </canvas>
  );
};

GLCanvas.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  setGl: PropTypes.func,
  fullScreen: PropTypes.bool,
  vShaderSource: PropTypes.string,
  fShaderSource: PropTypes.string
}

GLCanvas.defaultProps = {
  width: 400,
  height: 400,
  setGl: () => {},
  fullScreen: false,
  vShaderSource: '',
  fShaderSource: ''
}

export default GLCanvas;
