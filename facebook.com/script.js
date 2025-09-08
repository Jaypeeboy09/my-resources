// Toggle nav on small screens and switch between login/signup tabs
document.addEventListener('DOMContentLoaded', ()=>{
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if(navToggle){
    navToggle.addEventListener('click', ()=>{
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navLinks.classList.toggle('mobile-visible');
    });
  }

  const tabLogin = document.getElementById('tab-login');
  const tabSignup = document.getElementById('tab-signup');
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const openLogin = document.getElementById('open-login');
  const openSignup = document.getElementById('open-signup');

  function showLogin(){
    tabLogin.classList.add('active');
    tabSignup.classList.remove('active');
    loginForm.classList.add('active');
    signupForm.classList.remove('active');
  }
  function showSignup(){
    tabSignup.classList.add('active');
    tabLogin.classList.remove('active');
    signupForm.classList.add('active');
    loginForm.classList.remove('active');
  }

  tabLogin && tabLogin.addEventListener('click', showLogin);
  tabSignup && tabSignup.addEventListener('click', showSignup);
  openLogin && openLogin.addEventListener('click', showLogin);
  openSignup && openSignup.addEventListener('click', showSignup);

  // Basic client-side validation feedback
  loginForm && loginForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const pass = document.getElementById('login-pass').value;
    if(!email || !pass){
      alert('Please enter email/phone and password.');
      return;
    }
    alert('Login submitted (demo).');
  });

  signupForm && signupForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const fn = document.getElementById('first-name').value.trim();
    const ln = document.getElementById('last-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const pass = document.getElementById('signup-pass').value;
    if(!fn || !ln || !email || pass.length < 6){
      alert('Please complete the form. Password must be at least 6 characters.');
      return;
    }
    alert('Sign up submitted (demo).');
  });
});
