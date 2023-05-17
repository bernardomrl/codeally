<?php
    session_start();
    // 01.1 - Verificando se existe o cookie "user_uuid".
    if(isset($_COOKIE['user_uuid'])){ // Se existir um cookie, passar o valor para a session.
        $_SESSION['user_uuid'] = $_COOKIE['user_uuid'];
    }
    // 01.2 - Verificando se existe o valor na session.
    if(isset($_SESSION['user_uuid'])){
        $user_uuid = $_SESSION['user_uuid'];
    }

    $con = new mysqli('localhost', 'root', '', 'codeally');
    $stmt = $con->prepare('SELECT name, account_type FROM user_profile WHERE uuid = ?');
    $stmt->bind_param('s', $user_uuid);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
    $stmt->close();
    $con->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CodeAlly - Início</title>
</head>
<body>
    <?php if (!empty($user['name'])): ?>
        <p>Bem vindo(a) <?php echo explode(" ", $user['name'])[0];?>.</p>
        <a href="profile.php">Perfil</a>
        <a href="../helpers/logout.php">Sair</a>
    <?php else: ?>
        <a href="cadastro.php">Cadastrar</a>
        <a href="login.php">Logar</a>
    <?php endif; ?>
</body>
</html>