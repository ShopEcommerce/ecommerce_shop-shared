export enum Subjects {
  // Auth
  UserRegistered = 'user.registered',
  UserVerified = 'user.verified',
  UserLogin = 'user.login',
  UserLogout = 'user.logout',
  UserPasswordResetRequested = 'user.password_reset_requested',

  // Account
  ProfileUpdated = 'profile.updated',
  
  // Catalog / Inventory
  ProductCreated = 'product.created',
  ProductUpdated = 'product.updated',
  InventoryReserved = 'inventory.reserved',
  InventoryReservationFailed = 'inventory.reservation_failed',
  InventoryRestored = 'inventory.restored',
  InventoryFailed = 'inventory.failed',
  
  // Cart 
  CartCheckout = 'cart.checkout',

  // Order
  OrderCreated = 'order.created',
  OrderConfirmed = 'order.confirmed',
  OrderCancelled = 'order.cancelled',
  OrderCompleted = 'order.completed',
  OrderUpdated = 'order.updated',
  
  // Payment
  PaymentInitiated = 'payment.initiated',
  PaymentSuccess = 'payment.success',
  PaymentFailed = 'payment.failed',
  PaymentCompleted = 'payment.completed',
  RefundCompleted = 'refund.completed',

  // Review
  ReviewCreated = 'review.created',
  ReviewDeleted = 'review.deleted',
}
