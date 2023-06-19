/**
 * 1. install strip and react stripe js
 * 2. create a checkout form with card elements ( card elements contains : card number , expiration data , cvs, zip code)
 * 3 .create account on the stripe and get the publishable key 
 * 4 .get card information
 * 5 . create a payment method 
 * 6. use test card to test payment 
 * 7. on the server side install stripe
 * 8.  create payment intent api with payment_method_types:['card']
 * make sure you provide amount in cents (multiply price with 100)
 * 9. call payment intent api to client secret and store in state .
 * 10. use confirm card payment api with client secret card info.
 * 11. display confirm card error and display success message
 * 12. do things after payment ----->
 * 
 * 
 * 
*/