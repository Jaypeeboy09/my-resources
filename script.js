(() => {
  const display = document.getElementById('display');
  const keys = document.querySelector('.keys');

  let current = '';
  let prev = '';
  let operator = null;

  function updateDisplay(text) {
    display.textContent = text || '0';
  }

  function appendNumber(n) {
    if (n === '.' && current.includes('.')) return;
    if (current === '0' && n !== '.') current = n; else current += n;
  }

  function chooseOperator(op) {
    if (!current && prev) operator = op;
    if (!current) return;
    if (prev) compute();
    operator = op;
    prev = current;
    current = '';
  }

  function compute() {
    if (!prev || !operator || !current) return;
    const a = parseFloat(prev);
    const b = parseFloat(current);
    let res = 0;
    switch (operator) {
      case '+': res = a + b; break;
      case '-': res = a - b; break;
      case '*': res = a * b; break;
      case '/': res = b === 0 ? 'Error' : a / b; break;
      default: return;
    }
    current = String(res);
    prev = '';
    operator = null;
  }

  function clearAll() { current = ''; prev = ''; operator = null; }
  function deleteLast() { current = current.slice(0, -1); }

  keys.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const action = btn.dataset.action;
    const value = btn.dataset.value;

    if (btn.classList.contains('number')) {
      appendNumber(value);
      updateDisplay(current);
      return;
    }

    if (btn.classList.contains('operator')) {
      chooseOperator(value);
      updateDisplay(prev || current || '0');
      return;
    }

    if (action === 'clear') { clearAll(); updateDisplay('0'); return; }
    if (action === 'delete') { deleteLast(); updateDisplay(current || '0'); return; }
    if (action === 'percent') { if (current) current = String(parseFloat(current) / 100); updateDisplay(current); return; }
    if (action === 'equals') { compute(); updateDisplay(current); return; }
  });

  // keyboard support
  window.addEventListener('keydown', e => {
    if (e.key >= '0' && e.key <= '9') { appendNumber(e.key); updateDisplay(current); return; }
    if (e.key === '.') { appendNumber('.'); updateDisplay(current); return; }
    if (['+','-','*','/'].includes(e.key)) { chooseOperator(e.key); updateDisplay(prev || current || '0'); return; }
    if (e.key === 'Enter' || e.key === '=') { e.preventDefault(); compute(); updateDisplay(current); return; }
    if (e.key === 'Backspace') { deleteLast(); updateDisplay(current || '0'); return; }
    if (e.key.toLowerCase() === 'c') { clearAll(); updateDisplay('0'); return; }
    if (e.key === '%') { if (current) current = String(parseFloat(current) / 100); updateDisplay(current); return; }
  });

  // initialize
  updateDisplay('0');

})();
