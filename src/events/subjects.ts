export enum Subjects {
  // Auth
  UserRegistered = 'user.registered',
  UserLogin = 'user.login',
  UserLogout = 'user.logout',

  // Account
  ProfileUpdated = 'profile.updated',
  
  // Catalog / Inventory
  ProductCreated = 'product.created',
  ProductUpdated = 'product.updated',
  InventoryReserved = 'inventory.reserved',
  InventoryReservationFailed = 'inventory.reservation_failed',
  InventoryRestored = 'inventory.restored',
  
  // Cart 
  CartCheckout = 'cart.checkout',

  // Order
  OrderCreated = 'order.created',
  OrderConfirmed = 'order.confirmed',
  OrderCancelled = 'order.cancelled',
  
  // Payment
  PaymentInitiated = 'payment.initiated',
  PaymentSuccess = 'payment.success',
  PaymentFailed = 'payment.failed',
  RefundCompleted = 'refund.completed'
}