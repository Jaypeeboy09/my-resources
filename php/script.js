// script.js
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('pingBtn');
  const out = document.getElementById('result');

  btn.addEventListener('click', async () => {
    out.textContent = 'Contacting server...';

    try {
      const res = await fetch('api.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'ping',
          user: window.APP?.username || 'guest'
        })
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      out.textContent = JSON.stringify(data, null, 2);
    } catch (err) {
      out.textContent = `Error: ${err.message}`;
    }
  });
});