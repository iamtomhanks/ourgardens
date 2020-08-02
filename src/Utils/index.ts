import { createFilterObjects } from './Filters';
import {
  Colors, getHeatGradient, HeatGradients, GraphColorScheme,
} from './Colors';
import { API } from './API';
import { getDiversityHeatScore } from './Diversity';

const numberWithCommas = (x: number): string => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const pluralizeNoun = (count: number, word: string): string => (
  count === 1 ? word : `${word}s`
);

const stringContainsString = (s1: string, s2: string): boolean => (
  s1.toLowerCase().indexOf(s2.toLowerCase()) > -1
);

const saveAs = (uri: string, filename: string) => {
  const link = document.createElement('a');

  if (typeof link.download === 'string') {
    link.href = uri;
    link.download = filename;

    // Firefox requires the link to be in the body
    document.body.appendChild(link);

    // simulate click
    link.click();

    // remove the link when done
    document.body.removeChild(link);
  } else {
    window.open(uri);
  }
};

export {
  saveAs,
  API,
  createFilterObjects,
  getDiversityHeatScore,
  getHeatGradient,
  Colors,
  HeatGradients,
  GraphColorScheme,
  numberWithCommas,
  pluralizeNoun,
  stringContainsString,
};
