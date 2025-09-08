<!-- index.php -->
<?php
  $username = "Jeff"; // Example server-side value
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>HTML + CSS + JS + PHP</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <?php include __DIR__ . '/partials/header.php'; ?>

  <main class="container">
    <h1>Welcome, <?php echo htmlspecialchars($username); ?>!</h1>

    <button id="pingBtn">Ping server</button>
    <pre id="result"></pre>
  </main>

  <?php include __DIR__ . '/partials/footer.php'; ?>

  <script>
    // Pass PHP data to JS safely
    window.APP = {
      username: <?php echo json_encode($username); ?>
    };
  </script>
  <script src="script.js" defer></script>
</body>
</html>