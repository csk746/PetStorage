import config from './config';

// const server = config['DAOU'];
// console.log(server);

export function getHost() {
  return config['local'].url;
}
