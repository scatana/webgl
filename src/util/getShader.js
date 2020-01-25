const getShader = (gl, source, type) => {
  const shader = gl.createShader(type);

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(`Error: failed to compile ${type}.`);
    console.log(gl.getShaderInfoLog(shader));

    return false;
  }

  return shader;
};

export default getShader;
