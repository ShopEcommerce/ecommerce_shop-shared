import { Subjects } from './subjects';
import { BaseEventData } from './baseEvent';

// 1. Auth Events
export interface UserRegisteredEvent {
  subject: Subjects.UserRegistered;
  data: BaseEventData & {
    userId: string;
    email: string;
    role: 'ADMIN' | 'SELLER' | 'CUSTOMER';
    verificationToken: string;
  };
}

export interface UserVerifiedEvent {
  subject: Subjects.UserVerified;
  data: BaseEventData & {
    userId: string;
    email: string;
    role: 'ADMIN' | 'SELLER' | 'CUSTOMER';
  };
}

export interface UserLoginEvent {
  subject: Subjects.UserLogin;
  data: BaseEventData & {
    userId: string;
    email: string;
  };
}

export interface UserLogoutEvent {
  subject: Subjects.UserLogout;
  data: BaseEventData & {
    userId: string;
    email: string;
  };
}

export interface UserPasswordResetRequestedEvent {
  subject: Subjects.UserPasswordResetRequested;
  data: BaseEventData & {
    userId: string;
    email: string;
    resetToken: string;
  };
}

// 2. Catalog / Inventory Events
export interface InventoryReservedEvent {
  subject: Subjects.InventoryReserved;
  data: BaseEventData & {
    orderId: string;
    items: Array<{ productId: string; variantId: string; quantity: number }>;
  };
}

export interface InventoryReservationFailedEvent {
  subject: Subjects.InventoryReservationFailed;
  data: BaseEventData & {
    orderId: string;
    reason: string;
  };
}

// 3. Order Events
export interface OrderCreatedEvent {
  subject: Subjects.OrderCreated;
  data: BaseEventData & {
    orderId: string;
    customerId: string;
    totalAmount: number;
    items: Array<{ productId: string; quantity: number; price: number }>;
  };
}

export interface OrderCancelledEvent {
  subject: Subjects.OrderCancelled;
  data: BaseEventData & {
    orderId: string;
    customerId: string;
    reason: string;
  };
}

// 4. Payment Events
export interface PaymentSuccessEvent {
  subject: Subjects.PaymentSuccess;
  data: BaseEventData & {
    paymentId: string;
    orderId: string;
    amount: number;
  };
}

export interface PaymentFailedEvent {
  subject: Subjects.PaymentFailed;
  data: BaseEventData & {
    paymentId: string;
    orderId: string;
    reason: string;
  };
}
