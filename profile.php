<?php
require 'config.php';
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}
$stmt = $conn->prepare("SELECT username, email, created_at FROM users WHERE id=?");
$stmt->bind_param("i", $_SESSION['user_id']);
$stmt->execute();
$stmt->bind_result($username, $email, $created_at);
$stmt->fetch();
?>
<!DOCTYPE html>
<html>
<head>
    <title>Profile</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h2>Profile</h2>
    <p><b>Username:</b> <?= htmlspecialchars($username) ?></p>
    <p><b>Email:</b> <?= htmlspecialchars($email) ?></p>
    <p><b>Joined:</b> <?= htmlspecialchars($created_at) ?></p>
    <a href="dashboard.php">Dashboard</a> |
    <a href="logout.php">Logout</a>
</body>
</html>