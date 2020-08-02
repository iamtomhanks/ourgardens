// Modules
import { Dispatch } from 'redux';

// Interfaces
import {
  APIRoute,
  StateNodesResponse,
  GetStagesResponse,
  GetCategoryLineResponse,
  GetJobListResponse,
} from 'Interfaces/Requests';
import {
  StageStatus,
} from 'Interfaces/Common';
import {
  Filter, DateFilter, CustomDateFilterId, CurrentYearDateFilterId,
} from 'Interfaces/DashboardFilters';
import { GetDashboardResponse } from 'Interfaces/Requests/GetDashboard';
import { allStatesFilter, CustomDateType } from 'Interfaces/Dashboard';
import { CategoryData as StackedBarSeries } from 'Components/AmCharts/StackedBarList/StackedBarList';

// Constants
import { ActionTypes } from 'Constants';

// Utils
import { createFilterObjects, API } from 'Utils';

// Store
import reduxStore from 'Redux/Store';

/**
 * get stages
 */
const getStages = async (props: { dispatch: Dispatch }): Promise<void> => {
  const { dispatch } = props;

  dispatch({
    type: ActionTypes.GET_STAGES_STARTED,
    payload: null,
  });

  // company id
  const { companyId } = reduxStore.getState().dashboard;

  const response: GetStagesResponse = await API.get(
    APIRoute.GET_STAGES,
    {
      CompanyID: companyId,
    },
  ) as GetStagesResponse;

  dispatch({
    type: ActionTypes.GET_STAGES_SUCCESS,
    payload: {
      stateNodes: response.data,
    },
  });
};

/**
 * get met/not-met data for each state in the USA
 */
const getStateNodes = async (props: { dispatch: Dispatch }): Promise<void> => {
  const { dispatch } = props;

  // get attribute values for the selected attribute
  dispatch({
    type: ActionTypes.GET_STATE_NODES_STARTED,
    payload: null,
  });

  // company id
  const { companyId } = reduxStore.getState().dashboard;

  const response: StateNodesResponse = await API.post(
    APIRoute.GET_STATE_NODES,
    {
      CalculateByPercent: true,
      CompanyID: companyId,
    },
  ) as StateNodesResponse;

  const stateNodes = response.data.nodes;

  const stateFilters: Filter[] = createFilterObjects({
    arr: stateNodes,
    labelKey: 'name',
    valueKey: 'id',
  });

  dispatch({
    type: ActionTypes.GET_STATE_NODES_SUCCESS,
    payload: {
      stateNodes,
      stateFilters,
    },
  });
};

/**
 * get data for the dashboard
 */
const getDashboard = async (
  props: { dispatch: Dispatch }): Promise<void> => {
  const { dispatch } = props;

  dispatch({
    type: ActionTypes.GET_DASHBOARD_STARTED,
    payload: null,
  });

  // selected state
  const selectedState = reduxStore.getState().dashboard.heatMap.activeState;
  const stateId = selectedState === null ? null : selectedState.value as string;

  // selected date range
  const selectedDateRange = reduxStore.getState().dashboard.dateFilters.selected;
  const dateFilterTypeId = selectedDateRange === null ? null : selectedDateRange.value;

  // custom date range
  const { startDate, endDate } = reduxStore.getState().dashboard.dateFilters.custom;

  // company id
  const { companyId } = reduxStore.getState().dashboard;

  const response: GetDashboardResponse = await API.post(
    APIRoute.GET_DASHBOARD,
    {
      CompanyID: companyId,
      State: stateId,
      FieldID: null,
      DateFilterTypeID: dateFilterTypeId,
      StartDate: startDate,
      EndDate: endDate,
    },
  ) as GetDashboardResponse;

  const {
    CategoryStackChartData,
    EntryCount,
    EventCount,
    StackedChartData,
    DateFilterTypeList,
    EventPassPercent,
  } = response.data;

  // TODO: get the data back in this format from the backend
  const stageStacked: StackedBarSeries[] = [];
  StackedChartData.StackedChartDataFailGet.forEach((failChartData) => {
    const pass = StackedChartData.StackedChartDataPassGet.find((passChartdata) => (
      passChartdata.label === failChartData.label
    ));
    const notApplicable = StackedChartData.StackedChartDataNAGet.find((nAChartdata) => (
      nAChartdata.label === failChartData.label
    ));

    stageStacked.push({
      categoryX: failChartData.label,
      sortOrder: failChartData.Sequence || 1,
      [StageStatus.met]: pass ? pass.y : 0,
      [StageStatus.noData]: notApplicable ? notApplicable.y : 0,
      [StageStatus.notMet]: failChartData.y,
    });
  });

  const dateFilters: DateFilter[] = createFilterObjects({
    arr: DateFilterTypeList,
    labelKey: 'Name',
    valueKey: 'DateFilterTypeID',
    optParams: {
      filterTypeID: 'DateFilterTypeID',
      startDate: 'StartDate',
      endDate: 'EndDate',
    },
  }) as DateFilter[];

  dispatch({
    type: ActionTypes.GET_DASHBOARD_SUCCESS,
    payload: {
      categoryData: CategoryStackChartData,
      stageStacked,
      jobCount: EventCount,
      applicantCount: EntryCount,
      percentPassed: EventPassPercent,
      dateFilters,
    },
  });
};

/**
 * get data for the category line charts
 */
const getCategoryLine = async (
  props: { dispatch: Dispatch }): Promise<void> => {
  const { dispatch } = props;

  dispatch({
    type: ActionTypes.GET_CATEGORY_LINE_STARTED,
    payload: null,
  });

  // selected date range - use the current year by default
  const selectedDateRange = reduxStore.getState().dashboard.dateFilters.selected;
  const dateFilterTypeId = selectedDateRange === null ? CurrentYearDateFilterId : selectedDateRange.value;

  // custom date range
  const { startDate, endDate } = reduxStore.getState().dashboard.dateFilters.custom;

  // company id
  const { companyId } = reduxStore.getState().dashboard;

  const response: GetCategoryLineResponse = await API.post(
    APIRoute.GET_CATEGORY_LINE,
    {
      CompanyID: companyId,
      DateFilterTypeID: dateFilterTypeId,
      CalculateByPercent: true,
      StartDate: startDate,
      EndDate: endDate,
    },
  ) as GetCategoryLineResponse;

  const {
    DateIntervalList: dateIntervals,
    CategoryLineChartData: chartData,
  } = response.data;

  dispatch({
    type: ActionTypes.GET_CATEGORY_LINE_SUCCESS,
    payload: {
      dateIntervals,
      chartData,
    },
  });
};

/**
 * get data for the requisition list
 */
const getJobList = async (
  props: { dispatch: Dispatch }): Promise<void> => {
  const { dispatch } = props;

  // selected segment
  const selectedSegment = reduxStore.getState().dashboard.stageStacked.selectedGraphSegment;
  const { stageName, stageStatus } = selectedSegment;

  // selected state
  const selectedState = reduxStore.getState().dashboard.heatMap.activeState;
  const stateId = selectedState === null ? null : selectedState.value as string;

  // company id
  const { companyId } = reduxStore.getState().dashboard;

  dispatch({
    type: ActionTypes.GET_JOB_LIST_STARTED,
    payload: null,
  });

  const response: GetJobListResponse = await API.post(
    APIRoute.GET_JOB_LIST,
    {
      CompanyID: companyId,
      CalculateByPercent: true,
      Stage: stageName,
      StageStatus: stageStatus,
      State: stateId,
    },
  ) as GetJobListResponse;

  const jobList = response.data;

  dispatch({
    type: ActionTypes.GET_JOB_LIST_SUCCESS,
    payload: {
      jobList,
    },
  });
};

const loadDashboard = () => async (dispatch: Dispatch): Promise<void> => {
  // fetch the data for dashboard
  getDashboard({ dispatch }).then(() => {
    // fetch the data for category line charts
    getCategoryLine({ dispatch });

    // fetch the data for requisition list
    getJobList({ dispatch });

    // fetch the states nodes for the heat map
    getStateNodes({ dispatch });

    // fetch the stages for the stage stacked bar list
    getStages({ dispatch });
  });
};

const onStateSelect = (selectedState: Filter) => (dispatch: Dispatch): void => {
  const prevState = reduxStore.getState().dashboard.heatMap.activeState;

  let newState: Filter = allStatesFilter;
  if (prevState !== null && prevState.value !== selectedState.value) {
    newState = selectedState;
  }

  dispatch({
    type: ActionTypes.ON_STATE_SELECT,
    payload: {
      state: newState,
    },
  });

  getCategoryLine({ dispatch });
  getDashboard({ dispatch });
  getJobList({ dispatch });
};

const onDateRangeSelect = (selected: DateFilter) => (dispatch: Dispatch): void => {
  dispatch({
    type: ActionTypes.ON_DATE_RANGE_SELECT,
    payload: {
      selected,
    },
  });

  // don't re-fetch if 'Custom' was selected, start and end dates need to be selected
  if (selected.value !== CustomDateFilterId) {
    getDashboard({ dispatch });
    getCategoryLine({ dispatch });
  }
};

const onCustomDateSelect = (type: CustomDateType, date: Date|null) => (dispatch: Dispatch): void => {
  dispatch({
    type: ActionTypes.ON_CUSTOM_DATE_SELECT,
    payload: {
      type,
      date,
    },
  });

  const { startDate, endDate } = reduxStore.getState().dashboard.dateFilters.custom;

  if (startDate && endDate) {
    getDashboard({ dispatch });
    getCategoryLine({ dispatch });
  }
};

const onStageStackedClick = (stageName: string, stageStatus: string) => (dispatch: Dispatch): void => {
  dispatch({
    type: ActionTypes.ON_STAGE_STACKED_CLICK,
    payload: {
      stageName,
      stageStatus,
    },
  });

  // fetch the data for requisition list
  getJobList({ dispatch });
};

const onCatValChange = (category: string, value: string) => (dispatch: Dispatch): void => {
  dispatch({
    type: ActionTypes.ON_CAT_STACKED_CLICK,
    payload: {
      category,
      value,
    },
  });
};

const setCompanyId = (companyId: number) => (dispatch: Dispatch): void => {
  dispatch({
    type: ActionTypes.SET_COMPANY_ID,
    payload: {
      companyId,
    },
  });
};

export {
  loadDashboard,
  onStateSelect,
  onDateRangeSelect,
  onCustomDateSelect,
  onStageStackedClick,
  onCatValChange,
  setCompanyId,
};
