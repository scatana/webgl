import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import styles from './GLCanvas.css';

const GLCanvas = (props) => {
  const { setGlContext, fullScreen } = props;
  const canvasRef = useRef(null);
  const classNames = [styles.canvas];

  if (fullScreen) classNames.push(styles.fullScreen);

  useEffect(() => {
    const gl = canvasRef.current.getContext('webgl' || 'experimental-webgl');

    gl.viewport(0, 0, canvasRef.current.width, canvasRef.current.height);

    setGlContext(gl);
  });

  return (
    <canvas
      className={classNames.join(' ')}
      ref={canvasRef}>
      Your browser does not support WebGL.
    </canvas>
  );
};

GLCanvas.propTypes = {
  setGlContext: PropTypes.func,
  fullScreen: PropTypes.bool
}

GLCanvas.defaultProps = {
  setGlContext: () => {},
  fullScreen: false
}

export default GLCanvas;
