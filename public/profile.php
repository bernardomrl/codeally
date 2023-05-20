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
        $age = isset($_POST['idade']) ? $_POST['idade'] : '';
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
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../assets/styles/profile.php/style.css">
    <title>Document</title>
</head>
<body>
    <h3>Perfil - <?php echo explode(" ", $user['name'])[0]; ?></h3>

    <form method="POST">
        <label for="name">Nome:</label><br>
        <input type="text" name="name" value="<?php echo $user['name']; ?>" required><br>
        <label for="username">Usuário:</label><br>
        <input type="text" name="username" value="<?php echo $user['username']; ?>" required><br>
        <label for="email">Email:</label><br>
        <input type="email" name="email" value="<?php echo $user['email']; ?>" required><br>
        <label for="idade">Idade:</label><br>
        <input type="number" name="idade" value="<?php echo $user['age']; ?>"><br><br>
        <button type="button" class="password-button">Alterar senha</button><br><br>
        <div class="password-change hide">
            <label for="password">Digite a senha atual:</label><br>
            <input type="password" name="password"><br>
            <label for="password_new">Digite a nova senha:</label><br>
            <input type="password" name="password_new"><br>
            <label for="password_new_confirm">Confirme a nova senha:</label><br>
            <input type="password" name="password_new_confirm"><br><br>
        </div>
        <input type="submit" value="Atualizar">
    </form>
    <a href="index.php">Voltar</a>
    <?php if (!empty($message)): ?>
        <p><?php echo $message;?></p>
    <?php endif; ?>
    <script src="../assets/js/profile.php/script.js"></script>
</body>
</html>