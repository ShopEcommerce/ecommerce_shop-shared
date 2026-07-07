import { BaseEventData } from './baseEvent';
import { Subjects } from './subjects';

export type UserRole = 'ADMIN' | 'SELLER' | 'CUSTOMER';
export type OrderWorkflowStatus =
  | 'PENDING'
  | 'AWAITING_PAYMENT'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'RETURN_REQUESTED'
  | 'RETURNED';
export type PaymentProviderStatus = 'PENDING' | 'SUCCESS' | 'FAILED';

export interface ProductVariantQuantityItem {
  productId: string;
  variantId: string;
  quantity: number;
}

export interface SellerOrderItem extends ProductVariantQuantityItem {
  sellerId: string;
}

export interface ReviewableOrderItem {
  productId: string;
  quantity: number;
}

export interface UserRegisteredEvent {
  subject: Subjects.UserRegistered;
  data: BaseEventData & {
    userId: string;
    email: string;
    role: UserRole;
    verificationToken: string;
  };
}

export interface UserVerifiedEvent {
  subject: Subjects.UserVerified;
  data: BaseEventData & {
    userId: string;
    email: string;
    role: UserRole;
  };
}

export interface UserLoginEvent {
  subject: Subjects.UserLogin;
  data: BaseEventData & {
    userId: string;
    email: string;
    role: UserRole;
  };
}

export interface UserLogoutEvent {
  subject: Subjects.UserLogout;
  data: BaseEventData & {
    userId: string;
    email: string;
    role: UserRole;
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

export interface ProfileUpdatedEvent {
  subject: Subjects.ProfileUpdated;
  data: BaseEventData & {
    userId: string;
    email?: string;
  };
}

export interface ProductCreatedEvent {
  subject: Subjects.ProductCreated;
  data: BaseEventData & {
    productId: string;
    sellerId: string;
    status: string;
  };
}

export interface ProductUpdatedEvent {
  subject: Subjects.ProductUpdated;
  data: BaseEventData & {
    productId: string;
  };
}

export interface InventoryReservedEvent {
  subject: Subjects.InventoryReserved;
  data: BaseEventData & {
    orderId: string;
  };
}

export interface InventoryFailedEvent {
  subject: Subjects.InventoryFailed;
  data: BaseEventData & {
    orderId: string;
    reason: string;
  };
}

export interface InventoryRestoredEvent {
  subject: Subjects.InventoryRestored;
  data: BaseEventData & {
    orderId: string;
    items: ProductVariantQuantityItem[];
  };
}

export interface OrderCreatedEvent {
  subject: Subjects.OrderCreated;
  data: BaseEventData & {
    orderId: string;
    userId: string;
    items: SellerOrderItem[];
  };
}

export interface OrderConfirmedEvent {
  subject: Subjects.OrderConfirmed;
  data: BaseEventData & {
    orderId: string;
    userId: string;
  };
}

export interface OrderUpdatedEvent {
  subject: Subjects.OrderUpdated;
  data: BaseEventData & {
    orderId: string;
    status: OrderWorkflowStatus;
    version: number;
  };
}

export interface OrderCompletedEvent {
  subject: Subjects.OrderCompleted;
  data: BaseEventData & {
    orderId: string;
    userId: string;
    items: ReviewableOrderItem[];
  };
}

export interface OrderCancelledEvent {
  subject: Subjects.OrderCancelled;
  data: BaseEventData & {
    orderId: string;
    userId: string;
    reason: string;
    items: ProductVariantQuantityItem[];
  };
}

export interface PaymentInitiatedEvent {
  subject: Subjects.PaymentInitiated;
  data: BaseEventData & {
    orderId: string;
    userId: string;
    amount: number;
    provider: string;
    status: PaymentProviderStatus;
  };
}

export interface PaymentCompletedEvent {
  subject: Subjects.PaymentCompleted;
  data: BaseEventData & {
    orderId: string;
    paymentId?: string;
    amount?: number;
  };
}

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
    orderId: string;
    paymentId?: string;
    amount?: number;
    reason: string;
  };
}

export interface RefundCompletedEvent {
  subject: Subjects.RefundCompleted;
  data: BaseEventData & {
    orderId: string;
    paymentId?: string;
    amount?: number;
  };
}

export interface ReviewCreatedEvent {
  subject: Subjects.ReviewCreated;
  data: BaseEventData & {
    productId: string;
    rating: number;
    reviewId: string;
  };
}

export interface ReviewDeletedEvent {
  subject: Subjects.ReviewDeleted;
  data: BaseEventData & {
    productId: string;
    rating: number;
    reviewId: string;
  };
}

export interface CartCheckoutEvent {
  subject: Subjects.CartCheckout;
  data: BaseEventData & {
    userId: string;
    orderId: string;
  };
}

export type DomainEvent =
  | UserRegisteredEvent
  | UserVerifiedEvent
  | UserLoginEvent
  | UserLogoutEvent
  | UserPasswordResetRequestedEvent
  | ProfileUpdatedEvent
  | ProductCreatedEvent
  | ProductUpdatedEvent
  | InventoryReservedEvent
  | InventoryFailedEvent
  | InventoryRestoredEvent
  | OrderCreatedEvent
  | OrderConfirmedEvent
  | OrderUpdatedEvent
  | OrderCompletedEvent
  | OrderCancelledEvent
  | PaymentInitiatedEvent
  | PaymentCompletedEvent
  | PaymentSuccessEvent
  | PaymentFailedEvent
  | RefundCompletedEvent
  | ReviewCreatedEvent
  | ReviewDeletedEvent
  | CartCheckoutEvent;
