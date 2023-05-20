<?php
    session_start();

    if(isset($_COOKIE['user_uuid'])){
        $_SESSION['user_uuid'] = $_COOKIE['user_uuid'];
    }
    if(isset($_SESSION['user_uuid'])){
        header("Location: index.php");
        exit();
    }

    require_once("../classes/Login.php");

    $message = '';

    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        $login = isset($_POST['login']) ? $_POST['login'] : '';
        $password = isset($_POST['password']) ? $_POST['password'] : '';
        $remember_me = isset($_POST['remember_me']);

        $login = new Login($login, $password, $remember_me);

        try{
            $message = $login->login();
            header("Location: login.php");
        }catch(Exception $e){
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
    <link rel="stylesheet" href="../assets/styles/login.php/styles.css">
    <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css">
    <title>CodeAlly - Login</title>
</head>
<div class="container">
    <h3 class="container-title">Login</h3>
    <form method="post" class="container-form">
        <div class="form-input-wrap">
            <span><i class="uil uil-user form-icon"></i></span>
            <input type="text" class="form-input" name="login" placeholder="Login" value="<?php if (!empty($_POST['login'])) { echo $_POST['login']; } ?>" autocomplete="off">
        </div>
        <div class="form-input-wrap">
            <span><i class="uil uil-lock form-icon"></i></span>
            <input type="password" class="form-input" name="password" placeholder="Senha" autocomplete="off">
        </div>
        <div class="form-input-wrap">
            <input type="email" class="form-input" placeholder="Lembrar de mim" disabled>
            <div class="button-icon">
                <input type="checkbox" class="button-icon" name="remember_me">
                <label for="remember_me"><i class="uil uil-check"></i></label>
            </div>
        </div>
        <div class="form-input-wrap">
            <input class="form-input" type="submit" value="Login">
        </div>
        <div class="form-input-wrap">
            <input type="email" class="form-input" placeholder="Fazer Cadastro" disabled>
            <span><a href="register.php" class="uil uil-arrow-right button-icon"></a></span>
        </div>
    </form>
    <?php if (!empty($message)): ?>
        <div class="form-message">
            <p class="message"><?php echo $message;?></p>
        </div>
    <?php endif; ?>
</div>
<script src="../assets/js/login.php/script.js"></script>

<body>

</body>

</html>