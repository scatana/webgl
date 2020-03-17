import React from 'react';

import log from 'util/log';
import GLCanvas from 'components/common/GLCanvas';
import vShader from './shaders/vShader.glsl';
import fShader from './shaders/fShader.glsl';

const HelloPoint2 = () => {
  let a_Position, a_PointSize;

  const setup = (canvas, gl) => {
    a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
      log('HelloPoint2: failed to get the storage location of a_Position');
      return;
    }

    a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
    if (a_PointSize < 0) {
      log('HelloPoint2: failed to get the storage location of a_PointSize');
      return;
    }
  };

  const draw = (gl) => {
    gl.vertexAttrib1f(a_Position, 0.0);
    gl.vertexAttrib1f(a_PointSize, 5.0);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS, 0, 1);
  };

  return (
    <GLCanvas
      setup={setup}
      draw={draw}
      vShader={vShader}
      fShader={fShader}/>
  );
};

export default HelloPoint2;
