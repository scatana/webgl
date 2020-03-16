import React from 'react';

import GLCanvas from 'components/common/GLCanvas';
import vShader from './shaders/vShader.glsl';
import fShader from './shaders/fShader.glsl';

const HelloPoint2 = () => {
  const draw = (gl) => {
    const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
      console.log('Failed to get the storage location of a_Position');
      return;
    }

    const a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
    if (a_PointSize < 0) {
      console.log('Failed to get the storage location of a_PointSize');
      return;
    }

    gl.vertexAttrib1f(a_Position, 0.0);
    gl.vertexAttrib1f(a_PointSize, 5.0);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS, 0, 1);
  };

  return (
    <GLCanvas draw={draw} vShader={vShader} fShader={fShader}/>
  );
};

export default HelloPoint2;
