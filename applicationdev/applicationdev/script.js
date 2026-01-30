let autoRefreshInterval = null;

// Function to update display with random simulated data
function updateWithRandomData() {
    // Generate random values
    const level = (Math.random() * 5 + 1).toFixed(1); // 1-6m
    const battery = Math.floor(Math.random() * 101); // 0-100%
    const status = Math.random() > 0.1 ? "Active" : "Inactive"; // 90% chance Active

    // Update inputs
    document.getElementById('input-level').value = level;
    document.getElementById('input-battery').value = battery;
    document.getElementById('input-status').value = status;

    // Update display
    updateDisplay(level, battery, status);
}

function updateDisplay(level, battery, status) {
    // 2. Update Water Level Display & Thresholds
    const levelDisplay = document.getElementById('display-level');
    const badge = document.getElementById('threshold-label');
    const alertBanner = document.getElementById('alert-banner');

    levelDisplay.innerText = level;

    // Logic for Alert Thresholds
    if (level < 3) {
        badge.innerText = "Safe";
        badge.className = "badge bg-safe";
        alertBanner.classList.add('hidden');
    } else if (level >= 3 && level < 5) {
        badge.innerText = "Warning";
        badge.className = "badge bg-warning";
        alertBanner.classList.add('hidden');
    } else {
        badge.innerText = "Critical";
        badge.className = "badge bg-critical";
        alertBanner.classList.remove('hidden');
        alert("🚨 CRITICAL: River water level has exceeded safety limits!");
    }

    // 3. Update Battery
    document.getElementById('display-battery').innerText = battery;
    document.getElementById('battery-fill').style.width = battery + "%";

    // 4. Update Status
    const statusText = document.getElementById('display-status');
    const dot = document.getElementById('status-indicator');
    statusText.innerText = status;

    if (status === "Active") {
        dot.style.background = "#10b981";
        dot.classList.add('pulse');
    } else {
        dot.style.background = "#64748b";
        dot.classList.remove('pulse');
    }
}

document.getElementById('update-btn').addEventListener('click', function() {
    // Stop any existing auto-refresh
    if (autoRefreshInterval) {
        clearInterval(autoRefreshInterval);
    }

    // Get refresh rate
    const refreshRate = parseInt(document.getElementById('input-refresh').value) * 1000;

    // Start auto-refresh
    updateWithRandomData(); // Update immediately
    autoRefreshInterval = setInterval(updateWithRandomData, refreshRate);
});

// Stop button
document.getElementById('stop-btn').addEventListener('click', function() {
    if (autoRefreshInterval) {
        clearInterval(autoRefreshInterval);
        autoRefreshInterval = null;
    }
});

// Manual update (original functionality) - right-click on update button
document.getElementById('update-btn').addEventListener('contextmenu', function(e) {
    e.preventDefault();
    // 1. Fetch values from inputs
    const level = parseFloat(document.getElementById('input-level').value);
    const battery = document.getElementById('input-battery').value;
    const status = document.getElementById('input-status').value;

    updateDisplay(level, battery, status);
});

// Logout button functionality
document.getElementById('logout-btn').addEventListener('click', function() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
});

// Make cards interactive
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function() {
        const cardType = this.id;
        if (cardType === 'level-card') {
            const level = document.getElementById('display-level').innerText;
            alert(`Current Water Level: ${level} meters`);
        } else if (cardType === 'battery-card') {
            const battery = document.getElementById('display-battery').innerText;
            alert(`Current Battery Level: ${battery}%`);
        } else if (cardType === 'status-card') {
            const status = document.getElementById('display-status').innerText;
            alert(`Sensor Status: ${status}`);
        }
    });
});

// Login form submission handler
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = document.getElementById('loginBtn');
    const spinner = document.getElementById('spinner');
    const errorMsg = document.getElementById('errorMessage');

    btn.disabled = true;
    spinner.style.display = 'inline-block';
    errorMsg.style.display = 'none';

    setTimeout(() => {
        const emailInput = document.getElementById('loginEmail').value;
        const passInput = document.getElementById('loginPassword').value;
        const savedData = JSON.parse(localStorage.getItem('registeredUser'));

        if (savedData && emailInput === savedData.email && passInput === savedData.password) {
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'dashboard.html';
        } else {
            btn.disabled = false;
            spinner.style.display = 'none';
            errorMsg.textContent = "Invalid credentials.";
            errorMsg.style.display = 'block';
        }
    }, 1200);
});

// Toggle Password
document.getElementById('togglePassword').addEventListener('change', function() {
    document.getElementById('signupPassword').type = this.checked ? 'text' : 'password';
});

// Signup Logic
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = document.getElementById('signupBtn');
    const spinner = document.getElementById('spinner');

    btn.disabled = true;
    spinner.style.display = 'inline-block';

    setTimeout(() => {
        const userData = {
            email: document.getElementById('signupEmail').value,
            password: document.getElementById('signupPassword').value
        };
        localStorage.setItem('registeredUser', JSON.stringify(userData));
        alert("Account created!");
        window.location.href = 'login.html';
    }, 1000);
     function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
}

function deleteAccount() {
    if (confirm("Permanently delete this technician account?")) {
        localStorage.clear();
        window.location.href = 'signup.html';
    }
}
});
