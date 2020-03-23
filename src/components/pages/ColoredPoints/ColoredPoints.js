import React, { useEffect } from 'react';

import log from 'util/log';
import GLCanvas from 'components/common/GLCanvas';

import vShader from './shaders/vShader.glsl';
import fShader from './shaders/fShader.glsl';

const ColoredPoints = () => {
  let a_Position, a_PointSize, u_FragColor;
  let g_points = [];
  let g_colors = [];

  const setup = (canvas, gl) => {
    a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
      log('ColoredPoints: failed to get the storage location of a_Position');
      return;
    }

    a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
    if (a_PointSize < 0) {
      log('ColoredPoints: failed to get the storage location of a_PointSize');
      return;
    }

    u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    if (!u_FragColor) {
      log('ColoredPoints: failed to get the storage location of u_FragColor');
    }

    canvas.onmousedown = ev => click(ev, gl, canvas, a_Position, u_FragColor);
  };

  const draw = (gl) => {
    gl.vertexAttrib1f(a_Position, 0.0);
    gl.vertexAttrib1f(a_PointSize, 10.0);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    let len = g_points.length;
    for (let i = 0; i < len; i++) {
      const [x, y] = g_points[i];
      const rgba = g_colors[i];

      gl.vertexAttrib2f(a_Position, x, y);
      gl.uniform4fv(u_FragColor, rgba);

      gl.drawArrays(gl.POINTS, 0, 1);
    }
  };

  const click = (ev, gl, canvas, a_Position, u_FragColor) => {
    let x = ev.clientX; // x coordinate of the mouse pointer
    let y = ev.clientY; // y coordinate of the mouse pointer
    let rect = ev.target.getBoundingClientRect();

    x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
    y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);
    g_points.push([x, y]);

    if (x >= 0.0 && y >= 0.0) { // first quadrant
      g_colors.push([1.0, 0.0, 0.0, 1.0]); // red
    } else if (x < 0.0 && y < 0.0) { // third quadrant
      g_colors.push([0.0, 1.0, 0.0, 1.0]); // green
    } else {
      g_colors.push([1.0, 1.0, 1.0, 1.0]); // white
    }
  }

  return (
    <GLCanvas
      setup={setup}
      draw={draw}
      vShader={vShader}
      fShader={fShader}/>
  );
};

export default ColoredPoints;
