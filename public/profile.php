<?php
    session_start();
    if(isset($_COOKIE['user_uuid'])){
        $_SESSION['user_uuid'] = $_COOKIE['user_uuid'];
    }
    if(!isset($_SESSION['user_uuid'])){
        header("Location: index.php");
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
    <?php
        $user_uuid = $_SESSION['user_uuid'];
        $con = new mysqli("localhost", "root", "", "codeally");
        $stmt = $con->prepare('SELECT ua.username, ua.email, up.name, up.age FROM user_account ua JOIN user_profile up ON ua.uuid = up.uuid WHERE ua.uuid = ?');
        $stmt->bind_param("s", $user_uuid);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();
    ?>
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
            <label for="newpassword">Digite a nova senha:</label><br>
            <input type="password" name="newpassword"><br>
            <label for="password_confirm">Confirme a nova senha:</label><br>
            <input type="password" name="newpassword_confirm"><br><br>
        </div>
        <input type="submit" value="Atualizar">
    </form>
    <?php if (!empty($message)): ?>
        <p><?php echo $message;?></p>
    <?php endif; ?>
    <script src="../assets/js/profile.php/script.js"></script>
</body>
</html>