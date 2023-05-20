<?php
    session_start();

    if(isset($_COOKIE['user_uuid']))
    {
        $_SESSION['user_uuid'] = $_COOKIE['user_uuid'];
    }
    if(!isset($_SESSION['user_uuid']))
    {
        header("Location: index.php");
        exit();
    }

    require_once("../classes/Profile.php");

    $message = "";

    $user_uuid = $_SESSION['user_uuid'];
    $profile = new Profile($user_uuid);
    $user = $profile->getProfile();

    if ($_SERVER['REQUEST_METHOD'] === 'POST')
    {
        $name = isset($_POST['name']) ? $_POST['name'] : '';
        $username = isset($_POST['username']) ? $_POST['username'] : '';
        $email = isset($_POST['email']) ? $_POST['email'] : '';
        $age = isset($_POST['age']) ? $_POST['age'] : '';
        $password = isset($_POST['password']) ? $_POST['password'] : '';
        $password_change = !empty($password);
        $password_new = isset($_POST['password_new']) ? $_POST['password_new'] : '';
        $password_new_confirm = isset($_POST['password_new_confirm']) ? $_POST['password_new_confirm'] : '';

        $profile->setName($name);
        $profile->setUsername($username);
        $profile->setEmail($email);
        $profile->setAge($age);
        $profile->setPassword($password);
        $profile->setPasswordChange($password_change);
        $profile->setPasswordNew($password_new);
        $profile->setPasswordNewConfirm($password_new_confirm);

        try {
            $message = $profile->updateProfile($user);
        } catch (Exception $e) {
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
    <link rel="stylesheet" href="../assets/styles/profile.php/styles.css">
    <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css">
    <title>CodeAlly - Perfil</title>
</head>
<div class="container">
    <div class="form-message">
        <p class="message">Bem vindo(a) ao seu perfil.</p>
    </div>
    <form method="post" class="container-form">
        <div class="form-input-wrap">
            <span><i class="uil uil-smile form-icon"></i></span>
            <input type="text" class="form-input" name="name" placeholder="Nome" value="<?php echo $user['name']; ?>" autocomplete="off" required>
        </div>
        <div class="form-input-wrap">
            <span><i class="uil uil-at form-icon"></i></span>
            <input type="text" class="form-input" name="email" placeholder="Email" value="<?php echo $user['email']; ?>" autocomplete="off" required>
        </div>
        <div class="form-input-wrap">
            <span><i class="uil uil-user form-icon"></i></span>
            <input type="text" class="form-input" name="username" placeholder="Usuário" value="<?php echo $user['username']; ?>" autocomplete="off" required>
        </div>
        <div class="form-input-wrap">
            <span><i class="uil uil-calendar-alt form-icon"></i></span>
            <input type="text" class="form-input" name="age" placeholder="Idade" value="<?php echo $user['age']; ?>" autocomplete="off" required>
        </div>
        <div class="form-input-wrap" button>
            <span><i class="uil uil-asterisk form-icon"></i></span>
            <input class="form-input" type="button" value="Alterar senha" change-password>
        </div>
        <div class="form-input-wrap form-passwords">
            <div class="form-input-wrap">
                <span><i class="uil uil-lock form-icon"></i></span>
                <input class="form-input" type="password" placeholder="Senha atual" name="password">
            </div>
            <div class="form-input-wrap">
                <span><i class="uil uil-lock form-icon"></i></span>
                <input class="form-input" type="password" placeholder="Nova senha" name="password_new">
            </div>
            <div class="form-input-wrap">
                <span><i class="uil uil-lock form-icon"></i></span>
                <input class="form-input" type="password" placeholder="Nova senha" name="password_new_confirm">
            </div>
        </div>
        <div class="form-input-wrap">
            <input class="form-input" type="submit" value="Alterar">
        </div> 
        <div class="form-input-wrap" button>
            <span><i class="uil uil-arrow-left form-icon"></i></span>
            <input class="form-input" type="button" value="Voltar" back>
        </div>
    </form>
    <?php if (!empty($message)): ?>
        <div class="form-message">
            <p class="message"><?php echo $message;?></p>
        </div>
    <?php endif; ?>
</div>
<script src="../assets/js/profile.php/script.js"></script>

<body>

</body>

</html>