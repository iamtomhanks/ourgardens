// Interfaces
import { Filter } from 'Interfaces/DashboardFilters';

interface CreateFilterObjParams {
  labelKey: string;
  valueKey: string;
  arr: unknown[];
  optParams?: {[key: string]: string};
}

const createFilterObjects = ({
  arr, labelKey, valueKey, optParams,
}: CreateFilterObjParams):
Filter[] => arr.map((obj: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
  const filterObj = {
    label: obj[labelKey] as string,
    value: obj[valueKey],
  };

  if (optParams) {
    Object.keys(optParams).forEach((key: string) => {
      filterObj[key] = obj[optParams[key]];
    });
  }

  return filterObj;
});

export {
  createFilterObjects,
};
