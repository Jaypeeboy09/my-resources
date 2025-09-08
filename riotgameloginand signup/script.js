const loginForm = document.getElementById('loginForm');
const signUpForm = document.getElementById('signUpForm');
const showSignUp = document.getElementById('showSignUp');
const showLogin = document.getElementById('showLogin');
const formTitle = document.getElementById('formTitle');

showSignUp.addEventListener('click', () => {
  loginForm.classList.remove('active');
  signUpForm.classList.add('active');
  formTitle.textContent = 'Sign Up';
});

showLogin.addEventListener('click', () => {
  signUpForm.classList.remove('active');
  loginForm.classList.add('active');
  formTitle.textContent = 'Login';
});


loginForm.addEventListener('submit', e => {
  e.preventDefault();
  alert('Login submitted!');
});

signUpForm.addEventListener('submit', e => {
  e.preventDefault();
  alert('Sign Up submitted!');
});