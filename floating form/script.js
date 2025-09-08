const loginForm = document.querySelector('.login');
const signupForm = document.querySelector('.signup');
const showSignup = document.getElementById('showSignup');
const showLogin = document.getElementById('showLogin');

showSignup.addEventListener('click', () => {
  loginForm.classList.remove('active');
  signupForm.classList.add('active');
});

showLogin.addEventListener('click', () => {
  signupForm.classList.remove('active');
  loginForm.classList.add('active');
});