import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import styles from './GLCanvas.css';

const GLCanvas = (props) => {
  const { setGlContext, width, height, fullScreen } = props;
  const canvasRef = useRef(null);
  const classNames = [];

  if (fullScreen) classNames.push(styles.fullScreen);

  useEffect(() => {
    const gl = canvasRef.current.getContext('webgl' || 'experimental-webgl');

    gl.viewport(0, 0, canvasRef.current.width, canvasRef.current.height);

    setGlContext(gl);
  });

  return (
    <canvas
      width={width}
      height={height}
      className={classNames.join(' ')}
      ref={canvasRef}>
      Your browser does not support WebGL.
    </canvas>
  );
};

GLCanvas.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  setGlContext: PropTypes.func,
  fullScreen: PropTypes.bool
}

GLCanvas.defaultProps = {
  width: 400,
  height: 400,
  setGlContext: () => {},
  fullScreen: false
}

export default GLCanvas;
