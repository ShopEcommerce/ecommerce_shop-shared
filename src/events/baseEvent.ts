import { Subjects } from './subjects';

export interface BaseEventData {
  id: string;             // Message ID
  type: string;           // Event types (vd: 'UserRegistered')
  occurredAt: string;     // ISO timestamp
  version: number;        
  correlationId?: string; // For tracing across services
}

export interface Event<TData extends BaseEventData = BaseEventData> {
  subject: Subjects;
  data: TData;
}