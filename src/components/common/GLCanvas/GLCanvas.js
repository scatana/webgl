import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import styles from './GLCanvas.css';

const GLCanvas = (props) => {
  const { setGlContext } = props;
  const canvasRef = useRef(null);

  useEffect(() => {
    const gl = canvasRef.current.getContext('webgl' || 'experimental-webgl');

    setGlContext(gl);
  });

  return (
    <canvas className={styles.canvas} ref={canvasRef}>
      Your browser does not support WebGL.
    </canvas>
  );
};

GLCanvas.propTypes = {
  setGlContext: PropTypes.func
}

GLCanvas.defaultProps = {
  setGlContext: () => {}
}

export default GLCanvas;
