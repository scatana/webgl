import React, { useEffect, useState } from 'react';

import GLCanvas from 'components/common/GLCanvas';
import vShader from './shaders/vShader.glsl';
import fShader from './shaders/fShader.glsl';

const HelloPoint1 = () => {
  const [gl, setGl] = useState(null);

  useEffect(() => {
    gl && draw();
  }, [gl]);

  const draw = () => {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS, 0, 1);
  };

  return (
    <GLCanvas setGl={setGl} vShader={vShader} fShader={fShader}/>
  );
};

export default HelloPoint1;
