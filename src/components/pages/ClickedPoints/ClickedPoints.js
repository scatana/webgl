import React, { useEffect } from 'react';

import log from 'util/log';
import GLCanvas from 'components/common/GLCanvas';
import vShader from './shaders/vShader.glsl';
import fShader from './shaders/fShader.glsl';

const ClickedPoints = () => {
  let a_Position, a_PointSize;
  let g_points = [];

  const setup = (canvas, gl) => {
    a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
      log('ClickedPoints: failed to get the storage location of a_Position');
      return;
    }

    a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
    if (a_PointSize < 0) {
      log('ClickedPoints: failed to get the storage location of a_PointSize');
      return;
    }

    canvas.onmousedown = ev => click(ev, gl, canvas, a_Position);
  };

  const draw = (gl) => {
    gl.vertexAttrib1f(a_Position, 0.0);
    gl.vertexAttrib1f(a_PointSize, 10.0);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    let len = g_points.length;
    for (let i = 0; i < len; i+=2) {
      gl.vertexAttrib2f(a_Position, g_points[i], g_points[i+1]);

      gl.drawArrays(gl.POINTS, 0, 1);
    }
  };

  const click = (ev, gl, canvas, a_Position) => {
    let x = ev.clientX; // x coordinate of the mouse pointer
    let y = ev.clientY; // y coordinate of the mouse pointer
    let rect = ev.target.getBoundingClientRect();

    x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
    y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);
    g_points.push(x);
    g_points.push(y);
  }

  return (
    <GLCanvas
      setup={setup}
      draw={draw}
      vShader={vShader}
      fShader={fShader}/>
  );
};

export default ClickedPoints;
