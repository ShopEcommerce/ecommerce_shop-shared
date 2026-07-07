import { Subjects } from './subjects';

export interface BaseEventData {
  id: string; // Canonical message ID. New services should use this field instead of eventId.
  type: string; // Canonical event name. Prefer using the same value as subject for new/updated services.
  occurredAt: string; // ISO timestamp
  version: number;
  correlationId?: string; // For tracing across services
}

export interface Event<TData extends BaseEventData = BaseEventData> {
  subject: Subjects;
  data: TData;
}
