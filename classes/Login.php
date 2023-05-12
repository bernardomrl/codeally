<?php
    class Login{
        private $login = ""; // O valor pode ser tanto o email quanto o usuário.
        private $password = "";
        private $rememberMe = false; // Lembrar uuid do usuario.

        public function __construct($login, $password, $rememberMe){
            $this->login = $this->formatData($login);
            $this->password = $this->formatData($password);
            $this->rememberMe = $rememberMe;
        }

        private function formatData($data){
            $data = trim($data);
            $data = stripslashes($data);
            $data = htmlspecialchars($data);
            return $data;
        }

        public function logar(){
            try {
                // 01 - Pesquisa de dados no banco.
                // 01.1 - Conexão com o banco.
                $bd = new mysqli("localhost", "root", "", "codeally");
                // 01.2 - Verifica a conexão com o banco.
                if($bd->connect_error){
                    throw new Exception("Erro de conexão com o banco de dados: " . $bd->connect_error);
                }
                // 01.3 - Pesquisa de dados na tabela user_account.
                $stmt = $bd->prepare("SELECT uuid, username, email, password FROM user_account WHERE username = ? OR email = ?");
                $stmt->bind_param("ss", $this->login, $this->login);
                $stmt->execute();
                $stmt->bind_result($user_uuid, $username, $email, $hashedPass);
                if($stmt->fetch() === null){
                    throw new Exception("Email ou usuário não encontrado.");
                    $stmt->close();
                    $bd->close();
                }
                if(!password_verify($this->password, $hashedPass)){
                    throw new Exception("Senha incorreta.");
                    $stmt->close();
                    $bd->close();
                }
                $stmt->close();
                
                // 02 - Iniciando sessão do usuário.
                if($this->rememberMe){
                    setcookie("user_uuid", $user_uuid, strtime("+1 year"));
                } else {
                    $_SESSION['user_uuid'] = $user_uuid;
                }
            }catch(Exception $e){
                return $e->getMessage();
            }
        }
    }
?>