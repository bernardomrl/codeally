<?php
session_start();
session_unset();
session_destroy();

setcookie('user_uuid', '', time() - 3600, '/codeally/public'); // Destruir o cookie user_uuid

header("Location: ../public/index.php");
?>