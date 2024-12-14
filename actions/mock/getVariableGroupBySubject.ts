import { SubjectType } from '@/types/fake';
import { Subject2Data } from './mockData';
import { waitFor } from '@/lib/helper';

export const GetVariableGroupBySubject = async (subject: string) => {
  waitFor(500);
  return Promise.resolve(Subject2Data[subject as SubjectType]);
};
