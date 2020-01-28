import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import styles from './GLCanvas.css';

const GLCanvas = (props) => {
  const {
    width,
    height,
    setGl,
    fullScreen,
    vShader,
    fShader } = props;
  const canvasRef = useRef(null);

  useEffect(() => {
    // Get the WebGL context
    const gl = canvasRef.current.getContext('webgl' || 'experimental-webgl');

    // Adjust the viewport so that it covers the entire canvas
    gl.viewport(0, 0, canvasRef.current.width, canvasRef.current.height);


    if (vShader && fShader) {
      initShaders(gl, vShader, fShader);
    }

    // Pass the WebGL context to the parent
    setGl(gl);
  });

  const initShaders = (gl, vShader, fShader) => {
    const program = gl.createProgram(gl, vShader, fShader);

    if (!program) {
      console.log('(initShaders) Failed to create program.');

      return false;
    }

    gl.useProgram(program);
    gl.program = program;

    return true;
  };

  const createProgram = (gl, vShader, fShader) => {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vShader);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fShader);

    if (!vertexShader || !fragmentShader) {
      console.log('(createProgram) Unable to load shader(s).');
      return null;
    }

    const program = gl.createProgram();

    if (!program) {
      console.log('(createProgram) Unable to create program.');
      return null;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);

    const linked = gl.getProgramParameter(program, gl.LINK_STATUS);

    if (!linked) {
      console.log('(createProgram) Failed to link program: ' +
        gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);

      return null;
    }

    return program;
  };

  const loadShader = (gl, type, source) => {
    const shader = gl.createShader();

    if (!shader) {
      console.log('(loadShader) Unable to create shader.');

      return null;
    }

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

    if (!compiled) {
      console.log('(loadShader) Failed to compile shader: ' +
        gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);

      return null;
    }

    return shader;
  };

  return (
    <canvas
      width={fullScreen ? null : width}
      height={fullScreen ? null : height}
      className={fullScreen ? styles.fullScreen : null}
      ref={canvasRef}>
      Your browser does not support WebGL.
    </canvas>
  );
};

GLCanvas.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  setGl: PropTypes.func,
  fullScreen: PropTypes.bool,
  vShader: PropTypes.string,
  fShader: PropTypes.string
}

GLCanvas.defaultProps = {
  width: 400,
  height: 400,
  setGl: () => {},
  fullScreen: false,
  vShader: '',
  fShader: ''
}

export default GLCanvas;
