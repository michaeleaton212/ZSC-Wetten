(function(){
  emailjs.init("PqPY56nEQgsXhzvaJ");
})();

document.addEventListener('DOMContentLoaded', () => {
  const tipButtons = document.querySelectorAll('.tip-button');
  const tipModal = document.getElementById('tipModal');
  const closeButton = document.querySelector('.close-button');
  const tipForm = document.getElementById('tipForm');
  const modalGameTitle = document.getElementById('modalGameTitle');
  const confirmationMessage = document.getElementById('confirmationMessage');
  const messageField = document.getElementById('message');
  const errorMessage = document.getElementById('errorMessage');

  let currentGame = "";

  tipButtons.forEach(button => {
    button.addEventListener('click', () => {
      currentGame = button.dataset.game;
      modalGameTitle.textContent = currentGame;
      tipModal.style.display = "block";
    });
  });

  closeButton.addEventListener('click', () => {
    tipModal.style.display = "none";
    errorMessage.textContent = "";
  });

  window.addEventListener('click', (event) => {
    if (event.target == tipModal) {
      tipModal.style.display = "none";
      errorMessage.textContent = "";
    }
  });

  tipForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const from_name = document.getElementById('from_name').value.trim();
    const tip = document.getElementById('tip').value;
    const amount = document.getElementById('amount').value.trim();

    if (amount < 5) {
      errorMessage.textContent = "Der Einsatz muss mindestens 5 CHF betragen.";
      return;
    }

    errorMessage.textContent = "";

    messageField.value = `Spiel: ${currentGame}\nName: ${from_name}\nTipp: ${tip}\nEinsatz: ${amount} CHF`;

    emailjs.send("service_6rczoex", "template_bnv5z4o", {
      from_name: from_name,
      from_email: "noreply@zscwetten.ch",
      message: messageField.value
    })
    .then(() => {
      tipModal.style.display = "none";
      confirmationMessage.style.display = "block";
      setTimeout(() => {
        confirmationMessage.style.display = "none";
      }, 5000);
      tipForm.reset();
    }, (error) => {
      console.error("Fehler beim Senden:", error);
      alert("Es gab ein Problem beim Versenden. Bitte erneut versuchen.");
    });
  });
});
