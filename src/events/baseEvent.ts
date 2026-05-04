import { Subjects } from './subjects';

export interface BaseEventData {
  id: string;                 // Message ID
  timestamp: string;
  version: number;
  correlationId?: string;
  causationId?: string;
}

export interface Event<TData extends BaseEventData = BaseEventData> {
  subject: Subjects;
  data: TData;
}