const Colors = {
  permissiveGreen: '#238823',
  deniedRed: '#D2222D',
  blue1: '#c7deed',
  blue2: '#f5f9fc',
};

const GraphColorScheme = [
  '#47ACB1',
  '#F26526',
  '#CA382C',
  '#973D7A',
  '#FFCD36',
  '#2B6C4F',
];

const HeatGradients = [
  '#F79273',
  '#F5795A',
  '#F46648',
  '#F24935',
  '#E44029',
  '#D33A21',
  '#BC331A',
  '#A52C16',
  '#862212',
  '#6E1A0F',
];

/**
 * get a color for the heat map given an index from 0 to 9
 */
const getHeatGradient = (idx: number): string => HeatGradients[idx];

export {
  Colors,
  getHeatGradient,
  HeatGradients,
  GraphColorScheme,
};
