export interface IBeatType {
  display: string;
  value: string;
  image: string;
  classList?: Array<string>;
}

export default interface IBeatTypeList {
  [key: string]: Array<IBeatType>;
  layer1: Array<IBeatType>;
  layer2: Array<IBeatType>;
}

export interface ILine {
  [key: string]: string;
  layer1: string;
  layer2: string;
  main: string;
  repeat: string;
}
