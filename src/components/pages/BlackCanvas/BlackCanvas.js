import React, { lazy, useState, useEffect } from 'react';

import GLCanvas from 'components/common/GLCanvas';
import styles from './BlackCanvas.css';

const BlackCanvas = () => {
  const [gl, setGl] = useState(null);

  useEffect(() => {
    gl && draw();
  }, [ gl ]);

  const draw = () => {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }

  return (
    <div className={styles.canvasContainer}>
      <GLCanvas setGlContext={setGl} />
    </div>
  );
}

export default BlackCanvas;
