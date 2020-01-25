import React, { useState, useEffect } from 'react';

import GLCanvas from 'components/common/GLCanvas';

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
    <GLCanvas setGlContext={setGl} fullScreen={true} />
  );
}

export default BlackCanvas;
