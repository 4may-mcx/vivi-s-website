import { FlowInputType } from '@/types/workflow';

export const FlowInput: FlowInputType = {
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
