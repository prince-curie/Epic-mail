const resetPasswordSent = document.querySelector(".form__container");
const resetPasswordMessage = document.querySelector(".form__span-output");

resetSuccessMessage = (event) => {
  event.preventDefault();
  return resetPasswordMessage.textContent = `Check your email for link to reset password`;
}

resetPasswordSent.addEventListener('submit', resetSuccessMessage, false);


