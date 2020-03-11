import React from 'react';

import GLCanvas from 'components/common/GLCanvas';

const ClearCanvas = () => {
  const draw = (gl) => {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }

  return (
    <GLCanvas draw={draw} />
  );
}

export default ClearCanvas;
