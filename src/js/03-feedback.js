import throttle from 'lodash.throttle';

const emailBox = document.querySelector('input');
const messageBox = document.querySelector('textarea');
const form = document.querySelector('.feedback-form');

const currentInput = {
  email: emailBox.value,
  message: messageBox.value,
};

const followStorage = () => {
  const storedInput = localStorage.getItem('feedback-form-state');
  if (storedInput) {
    const { email, message } = JSON.parse(storedInput);
    (emailBox.value = email), (messageBox.value = message);
  }
};
window.addEventListener('load', followStorage);

const loadInput = () => {
  currentInput.email = emailBox.value;
  currentInput.message = messageBox.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(currentInput));
};

form.addEventListener('input', throttle(loadInput, 500));

const loadSubmit = e => {
  e.preventDefault();
  if (emailBox.value === '' || messageBox.value === '') {
    console.log('Please fill in all the fields!');
  } else {
    console.log(currentInput);
    localStorage.removeItem('feedback-form-state');
    form.reset();
  }
};

form.addEventListener('submit', loadSubmit);
