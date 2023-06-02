<?php
    session_start();
    if(isset($_COOKIE['user_uuid']))
    {
        $_SESSION['user_uuid'] = $_COOKIE['user_uuid'];
    }
    if(isset($_SESSION['user_uuid'])){
        $user_uuid = $_SESSION['user_uuid'];
    }

    $conn = new mysqli('localhost', 'root', '', 'codeally');
    $stmt = $conn->prepare('SELECT name, account_type FROM user_profile WHERE uuid = ?');
    $stmt->bind_param('s', $user_uuid);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
    $stmt->close();
    $conn->close();
?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../assets/styles/index.php/styles.css">
    <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css">
    <title>CodeAlly - Início</title>
</head>
<div class="container">
    <h3 class="container-title">Início</h3>
    <?php if (!empty($user['name'])): ?>
        <div class="form-message">
            <p class="message">Bem vindo(a) <?php echo explode(" ", $user['name'])[0];?>.</p>
        </div>
        <form method="post" class="container-form">
            <div class="form-input-wrap">
                <span><i class="uil uil-user-square form-icon"></i></span>
                <input class="form-input" type="button" value="Perfil" profile>
            </div>
            <div class="form-input-wrap">
                <span><i class="uil uil-sign-out-alt form-icon"></i></span>
                <input class="form-input" type="button" value="Sair" exit>
            </div>
        </form>
    <?php else: ?>
        <form method="post" class="container-form">
            <div class="form-input-wrap">
                <span><i class="uil uil-user-square form-icon"></i></span>
                <input class="form-input" type="button" value="Cadastrar" register>
            </div>
            <div class="form-input-wrap">
                <span><i class="uil uil-sign-out-alt form-icon"></i></span>
                <input class="form-input" type="button" value="Login" login>
            </div>
        </form>
    <?php endif; ?>
</div>
<script src="../assets/js/index.php/script.js"></script>

<body>

</body>

</html>