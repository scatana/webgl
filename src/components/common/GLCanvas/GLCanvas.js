import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import log from 'util/log';

import styles from './GLCanvas.css';

const GLCanvas = (props) => {
  const {
    width,
    height,
    fullScreen,
    setup,
    draw,
    vShader,
    fShader
  } = props;
  const canvasRef = useRef(null);

  useEffect(() => {
    // Get the WebGL context
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl');

    // Make sure the viewport matches the canvas size
    function adjustViewport() {
      if (fullScreen) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    log('GLCanvas: adjusting viewport...');
    adjustViewport();

    // Initialize the shaders
    if (vShader && fShader) {
      log('GLCanvas: initializing shaders...');
      initShaders(gl, vShader, fShader);
    }

    // Setup hook
    log('GLCanvas: running setup hook...');
    setup(canvas, gl);

    // Render the scene
    function render() {
      draw(gl);

      window.requestAnimationFrame(render);
    }
    log('GLCanvas: rendering...');
    window.requestAnimationFrame(render);

    // If we're in fullscreen, watch for window resizing events
    if (fullScreen) {
      window.addEventListener('resize', adjustViewport);
    }
    return function cleanup() {
      window.removeEventListener('resize', adjustViewport);
    }
  });

  const initShaders = (gl, vShader, fShader) => {
    const program = createProgram(gl, vShader, fShader);

    if (!program) {
      log('GLCanvas (initShaders): failed to create program.');

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
      log('GLCanvas (createProgram): unable to load shader(s).');
      return null;
    }

    const program = gl.createProgram();

    if (!program) {
      log('GLCanvas (createProgram): unable to create program.');
      return null;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);

    const linked = gl.getProgramParameter(program, gl.LINK_STATUS);

    if (!linked) {
      log('GLCanvas (createProgram): failed to link program: ' +
        gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);

      return null;
    }

    return program;
  };

  const loadShader = (gl, type, source) => {
    const shader = gl.createShader(type);

    if (!shader) {
      log('GLCanvas (loadShader): unable to create shader.');

      return null;
    }

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

    if (!compiled) {
      log('GLCanvas (loadShader): failed to compile shader: ' +
        gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);

      return null;
    }

    return shader;
  };

  return (
    <canvas
      width={fullScreen ? window.innerWidth : width}
      height={fullScreen ? window.innerHeight : height}
      className={fullScreen ? styles.fullScreen : null}
      ref={canvasRef}>
      Your browser does not support WebGL.
    </canvas>
  );
};

GLCanvas.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  setup: PropTypes.func,
  draw: PropTypes.func,
  fullScreen: PropTypes.bool,
  vShader: PropTypes.string,
  fShader: PropTypes.string
}

GLCanvas.defaultProps = {
  width: 400,
  height: 400,
  setup: () => {},
  draw: () => {},
  fullScreen: true,
  vShader: '',
  fShader: ''
}

export default GLCanvas;
