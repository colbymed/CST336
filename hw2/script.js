$("#applyCoupon").on("click", validateCoupon);
$("#plusBat").on("click", addBat);
$("#minusBat").on("click", removeBat);
$("#plusBall").on("click", addBall);
$("#minusBall").on("click", removeBall);
$("#plusGlove").on("click", addGlove);
$("#minusGlove").on("click", removeGlove);
var quantities = [0,0,0];
var prices = [89.99, 2.99, 45.99];
var subtotal = 0.00;
var tax = 0.00;
var total = 0.00;
var coupon = false;
updateQuantities();
updateTotals();
function validateCoupon() {
  let couponEntry = $("#coupon").val();
  if (couponEntry == "CST336") {
    coupon = true;
    $("#discount").html(" 15% off! ");
  }
  else {
    coupon = false;
    $("#discount").html("");
  }
  updateTotals();
}
function updateQuantities() {
  $("#batQuantity").html(`${quantities[0]}`);
  $("#ballQuantity").html(`${quantities[1]}`);
  $("#gloveQuantity").html(`${quantities[2]}`);
  updateTotals();
}
function addBat() {
  quantities[0]++;
  updateQuantities();
}
function removeBat() {
  if (quantities[0] > 0) {
    quantities[0]--;
  }
  updateQuantities();
}
function addBall() {
  quantities[1]++;
  updateQuantities();
}
function removeBall() {
  if (quantities[1] > 0) {
    quantities[1]--;
  }
  updateQuantities();
}
function addGlove() {
  quantities[2]++;
  updateQuantities();
}
function removeGlove() {
  if (quantities[2] > 0) {
    quantities[2]--;
  }
  updateQuantities();
}
function updateTotals() {
  subtotal = 0;
  for (i = 0; i < quantities.length; i++) {
    subtotal += quantities[i] * prices[i];
  }
  subtotal = Math.round(subtotal * 100) / 100;
  tax = subtotal * 0.095;
  tax = Math.round(tax * 100) / 100;
  total = subtotal + tax;
  if (coupon) {
    total *= .85;
  }
  total = Math.round(total * 100) / 100;
  $("#subtotal").html(`${subtotal}`);
  $("#tax").html(`${tax}`);
  $("#total").html(`${total}`);
}