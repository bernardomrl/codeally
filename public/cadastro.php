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
    }
    // 02 - Importando classe para o código.
    require_once("../classes/Cadastro.php");
    // 03 - Passando parâmetros para a classe.
    $message = ""; // Variável para armazenar a mensagem
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        $name = $_POST['name'];
        $username = $_POST['username'];
        $email = $_POST['email'];
        $password = $_POST['password'];
        $account_type = isset($_POST['account_type']) ? $_POST['account_type'] : '';

        $cadastro = new Cadastro($name, $username, $email, $password, $account_type);
        try{
            $message = $cadastro->cadastrar();
        } catch(Exception $e) {
            $message = $e->getMessage();
        }
    }
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../assets/cadastro.php/style.css">
    <title>CodeAlly - Cadastro</title>
</head>
<body>
    <form method="post">
        <label for="name">Nome:</label><br>
        <input type="text" name="name" value="<?php if (!empty($_POST['name'])) { echo $_POST['name']; } ?>"><br>
        <label for="username">Usuário:</label><br>
        <input type="text" name="username" value="<?php if (!empty($_POST['username'])) { echo $_POST['username']; } ?>"><br>
        <label for="email">Email:</label><br>
        <input type="text" name="email" value="<?php if (!empty($_POST['email'])) { echo $_POST['email']; } ?>"><br>
        <label for="password">Senha:</label><br>
        <input type="password" name="password"><br><br>
        <label for="account_type">Selecione o tipo de conta:</label>
        <select name="account_type">
            <option value="1">Usuário</option>
            <option value="2">Freelancer</option>
        </select><br><br>
        <button type="submit">Cadastrar</button><br><br>
    </form>
    <a href="login.php">Fazer login</a>
    <?php if (!empty($message)): ?>
        <p><?php echo $message;?></p>
    <?php endif; ?>
</body>
</html>