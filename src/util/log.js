const log = (...args) => {
  console.log(performance.now(), '|', ...args);
}

export default log;
