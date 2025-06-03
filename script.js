var typed = new Typed(".text", {
  strings: ["Economy Car", "SUVs", "Premium Cars", "Full-Size Car", "Sedan Car"],
  typeSpeed: 10,
  backSpeed: 100,
  backDelay: 1000,
  loop: true
});

document.getElementById('carType').addEventListener('change', calculatePrice);
document.getElementById('days').addEventListener('input', calculatePrice);

function calculatePrice() {
  const carType = document.getElementById('carType').value;
  const days = parseInt(document.getElementById('days').value) || 0;
  let rate = 0;

  if (carType.includes('Economy')) rate = 1000;
  else if (carType.includes('SUV')) rate = 1500;
  else if (carType.includes('Premium')) rate = 2000;

  const total = rate * days;
  document.getElementById('price-display').textContent = total;
}

document.getElementById('payment').addEventListener('change', function () {
  const upiSection = document.getElementById('upi-section');
  const image = document.getElementById('display-img');

  if (this.value === 'upi') {
    upiSection.style.display = 'block';
    image.src = 'img/QR.jpg';
  } else {
    upiSection.style.display = 'none';
    image.src = 'img/car.png';
  }
});

document.getElementById('book-now').addEventListener('click', function () {
  const form = document.getElementById('booking-form');
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  let rate = 0;
  if (data.carType.includes('Economy')) rate = 1000;
  else if (data.carType.includes('SUV')) rate = 1500;
  else if (data.carType.includes('Premium')) rate = 2000;

  const total = rate * parseInt(data.days || 0);
  data.totalPrice = total;

  if (data.payment === 'upi' && !data.transactionId) {
    alert('Please enter your UPI Transaction ID.');
    return;
  }

  localStorage.setItem('carBooking', JSON.stringify(data));

});
