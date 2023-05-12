<?php
    // 01 - Iniciando sessão.
    session_start();
    // 01.1 - Verificando se existe o cookie "user_uuid".
    if(isset($_COOKIE['user_uuid'])){ // Se existir um cookie, passar o valor para a session.
        $_SESSION['user_uuid'] = $_COOKIE['user_uuid'];
    }
    // 01.2 - Verificando se existe o valor na session.
    if(!isset($_SESSION['user_uuid'])){ // Se não existir um uuid na session, o usuario não está logado.
        header("Location: login.php");
    }
    // teste
    $user_uuid = $_SESSION['user_uuid'];
    $bd = new mysqli("localhost", "root", "", "codeally");
    $stmt = $bd->prepare("SELECT name FROM user_profile WHERE uuid = ?");
    $stmt->bind_param("s", $user_uuid);
    $stmt->execute();
    $stmt->bind_result($name);
    $stmt->fetch();
    $stmt->close();
    $bd->close();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>INDEX</title>
</head>
<body>
    <?php if (!empty($name)): ?>
        <p>Bem vindo(a), <?php echo $name;?>.</p>
        <form action="../helpers/endsession.php">
            <button type="submit">Deslogar</button>
        </form>
        <a href="sessionmanager.php">Verificar dados na session</a>
    <?php endif; ?>
</body>
</html>