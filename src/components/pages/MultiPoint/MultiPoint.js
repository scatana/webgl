import React from 'react';

import log from 'util/log';
import GLCanvas from 'components/common/GLCanvas';

import vShader from './shaders/vShader.glsl';
import fShader from './shaders/fShader.glsl';

const MultiPoint = () => {
  let a_Position, vertexBuffer;
  const vertices = new Float32Array([
    0.0, 0.5,
    -0.5, -0.5,
    0.5, -0.5
  ]);
  const n = vertices.length / 2;

  const setup = (canvas, gl) => {
    vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      log('MultiPoint: failed to create the buffer object');
      return;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
      log('MultiPoint: failed to get the storage location of a_Position');
      return;
    }

    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);
  };

  const draw = (gl) => {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS, 0, n);
  };

  const initVertexBuffers = (gl) => {

  }

  return (
    <GLCanvas
      setup={setup}
      draw={draw}
      vShader={vShader}
      fShader={fShader}/>
  );
};

export default MultiPoint;
