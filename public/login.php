<?php
    // 01 - Iniciando sessão.
    session_start();
    // 01.1 - Verificando se existe o cookie "user_uuid".
    if(isset($_COOKIE['user_uuid'])){ // Se existir um cookie, passar o valor para a session.
        $_SESSION['user_uuid'] = $_COOKIE['user_uuid'];
    }
    // 01.2 - Verificando se existe o valor na session.
    if(isset($_SESSION['user_uuid'])){ // Se existir um user_uuid na session, encaminhar para o index.php, pois já está logado.
        header("Location: index.php");
        exit();
    }
    // 02 - Importando classe.
    require_once("../classes/Login.php");
    // 03 - Passando parâmetros para a classe.
    $message = ""; // Variável para armazenar a mensagem

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $login = isset($_POST['login']) ? $_POST['login'] : '';
        $password = isset($_POST['password']) ? $_POST['password'] : '';
        $rememberMe = isset($_POST['rememberMe']);
    
        if (!empty($login) && !empty($password)) {
            // Os campos de login e senha estão preenchidos, continuar com o processo de login.
            $loginObject = new Login($login, $password, $rememberMe);
    
            try {
                $message = $loginObject->login();
            } catch (Exception $e) {
                $message = $e->getMessage();
            }
        } else {
            // Os campos de login e/ou senha estão vazios, exibir uma mensagem de erro.
            $message = "Por favor, preencha todos os campos.";
        }
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CodeAlly - Login</title>
</head>
<body>
    <form method="post">
        <label for="login">Login:</label><br>
        <input type="text" name="login" value="<?php if (!empty($_POST['login'])) { echo $_POST['login']; } ?>"><br>
        <label for="password">Senha:</label><br>
        <input type="password" name="password"><br><br>
        <label for="rememberMe">Lembrar de mim:</label>
        <input type="checkbox" name="rememberMe"><br><br>
        <button type="submit">Logar</button><br><br>
    </form>
    <a href="cadastro.php">Fazer cadastro</a>
    <?php if (!empty($message)): ?>
        <p><?php echo $message;?></p>
    <?php endif; ?>
</body>
</html>