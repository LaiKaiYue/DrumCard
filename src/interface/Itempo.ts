export interface Ibeat {
  display: string;
  value: string;
  image: string;
  classList?: Array<string>;
}

export default interface Ilayer {
  [key: string]: Array<Ibeat>;
  layer1: Array<Ibeat>;
  layer2: Array<Ibeat>;
}

export interface ItxtLayer {
  [key: string]: string;
  layer1: string;
  layer2: string;
  main: string;
  repeat: string;
}

export interface Iline {
  [index: number]: ItxtLayer;
}
