<?php
    session_start();
    if(isset($_COOKIE['user_uuid'])){
        $_SESSION['user_uuid'] = $_COOKIE['user_uuid'];
    }
    if(isset($_SESSION['user_uuid'])){
        header("Location: index.php");
        exit();
    }

    require_once("../classes/Register.php");

    $message = '';

    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        $name = $_POST['name'];
        $username = $_POST['username'];
        $email = $_POST['email'];
        $password = $_POST['password'];
        $account_type = isset($_POST['account_type']) ? $_POST['account_type'] : '';

        $cadastro = new Register($name, $username, $email, $password, $account_type);
        try{
            $message = $cadastro->register();
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
    <link rel="stylesheet" href="../assets/styles/register.php/styles.css">
    <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css">
    <title>CodeAlly - Cadastro</title>
</head>
<div class="container">
    <h3 class="container-title">Cadastro</h3>
    <form method="post" class="container-form">
        <div class="form-input-wrap">
            <span><i class="uil uil-smile form-icon"></i></span>
            <input type="text" class="form-input" name="name" placeholder="Nome" value="<?php if (!empty($_POST['name'])) { echo $_POST['name']; } ?>" autocomplete="off">
        </div>
        <div class="form-input-wrap">
            <span><i class="uil uil-at form-icon"></i></span>
            <input type="text" class="form-input" name="email" placeholder="Email" value="<?php if (!empty($_POST['email'])) { echo $_POST['email']; } ?>" autocomplete="off">
        </div>
        <div class="form-input-wrap">
            <span><i class="uil uil-user form-icon"></i></span>
            <input type="text" class="form-input" name="username" placeholder="Usuário" value="<?php if (!empty($_POST['username'])) { echo $_POST['username']; } ?>" autocomplete="off">
        </div>
        <div class="form-input-wrap">
            <span><i class="uil uil-lock form-icon"></i></span>
            <input type="password" class="form-input" name="password" placeholder="Senha" autocomplete="off">
        </div>
        <div class="form-input-wrap">
            <input type="email" class="form-input" placeholder="Tipo de conta" autocomplete="off" disabled>
            <div class="select-wrap">
                <select name="account_type" id="">
                    <option value="1">Usuário</option>
                    <option value="2">Freelancer</option>
                </select>
                <i class="uil uil-bars select-icon"></i>
            </div>
        </div>
        <div class="form-input-wrap">
            <input class="form-input" type="submit" value="Cadastrar">
        </div>
        <div class="form-input-wrap">
            <input type="email" class="form-input" placeholder="Fazer Login" disabled>
            <span><a href="login.php" class="uil uil-arrow-right button-icon"></a></span>
        </div>
    </form>
    <?php if (!empty($message)): ?>
        <div class="form-message">
            <p class="message"><?php echo $message;?></p>
        </div>
    <?php endif; ?>
</div>
<script src="../assets/js/register.php/script.js"></script>

<body>

</body>

</html>