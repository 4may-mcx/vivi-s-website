import { SubjectType } from '@/types/fake';

type MockInputDataType = Record<
  string,
  { label: string; value: string | number | boolean }
>;

export const EnglishData: MockInputDataType = {
  subject: {
    label: '英语',
    value: SubjectType.English,
  },
  userAvgRate: {
    label: '用户平均分',
    value: 0.8,
  },
  countryAvgRate: {
    label: '全国平均分',
    value: 0.85,
  },
  isFirstBuy: {
    label: '是否首购',
    value: true,
  },
};

export const ChineseData: MockInputDataType = {
  subject: {
    label: '语文',
    value: SubjectType.Chinese,
  },
  userAvgRate: {
    label: '用户平均分',
    value: 1,
  },
  countryAvgRate: {
    label: '全国平均分',
    value: 0.95,
  },
  isFirstBuy: {
    label: '首购',
    value: false,
  },
};

export const MathData: MockInputDataType = {
  subject: {
    label: '数学',
    value: SubjectType.Math,
  },
  userAvgRate: {
    label: '用户平均分',
    value: 0.8,
  },
  countryAvgRate: {
    label: '全国平均分',
    value: 0.65,
  },
  isFirstBuy: {
    label: '是否首购',
    value: false,
  },
};

export const Subject2Data: Record<SubjectType, MockInputDataType> = {
  [SubjectType.English]: EnglishData,
  [SubjectType.Chinese]: ChineseData,
  [SubjectType.Math]: MathData,
};
