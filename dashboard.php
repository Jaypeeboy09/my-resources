<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Dashboard</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h2>Dashboard</h2>
    <p>Welcome, <?= htmlspecialchars($_SESSION['username']) ?>!</p>
    <a href="profile.php">Profile</a> |
    <a href="home.php">Home</a> |
    <a href="about.php">About</a> |
    <a href="logout.php">Logout</a>
</body>
</html>