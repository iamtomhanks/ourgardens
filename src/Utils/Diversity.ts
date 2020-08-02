/**
 * get a diversity score. number either -1 or from 0 to 9
 * -1 = all met, 9 = all not met
 */
const getDiversityHeatScore = (met: number, notMet: number): number => {
  // Math.round((met / (met + notMet)) * 10)
  const total = met + notMet;

  if (met === total) {
    return -1;
  }

  // return number from 0 to 9
  return Math.floor(((notMet / total) * 10)) - 1;
};

export {
  getDiversityHeatScore,
};
