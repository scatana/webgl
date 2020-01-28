import React, { useState, useEffect } from 'react';

import GLCanvas from 'components/common/GLCanvas';
import vertex_shader_source from './shaders/vertex_shader.glsl';
import fragment_shader_source from './shaders/fragment_shader.glsl';
import getShader from 'util/getShader';

const ColoredTriangle2D = () => {
  const [gl, setGl] = useState(null);

  useEffect(() => {
    gl && draw();
  }, [ gl ]);

  const draw = () => {
    const vertexShader = getShader(gl, vertex_shader_source, gl.VERTEX_SHADER);
    const fragmentShader = getShader(gl, fragment_shader_source, gl.FRAGMENT_SHADER);
    const program = gl.createProgram();

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    const vPosition = gl.getAttribLocation(program, 'vPosition');
    gl.enableVertexAttribArray(vPosition);

    gl.useProgram(program);

    const triangleVertices = [
      -1, -1,
      1, -1,
      1, 1
    ];
    const triangleVerticesBuff = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVerticesBuff);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

    const triangleFaces = [0, 1, 2];
    const triangleFacesBuff = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleFacesBuff);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(triangleFaces), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVerticesBuff);
  }

  return (
    <GLCanvas setGl={setGl} fullScreen={true} />
  );
};

export default ColoredTriangle2D;
