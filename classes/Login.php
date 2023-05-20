<?php
    class Login
    {
        private $login = '';
        private $password = '';
        private $remember_me = false;

        public function __construct($login, $password, $remember_me)
        {
            $this->login = $this->formatData($login);
            $this->password = $this->formatData($password);
            $this->remember_me = $remember_me;
        }

        private function formatData($data)
        {
            $data = trim($data);
            $data = stripslashes($data);
            $data = htmlspecialchars($data);
            return $data;
        }

        public function login()
        {
            try
            {
                $conn = new mysqli('localhost', 'root', '', 'codeally');
                if($conn->connect_error)
                {
                    throw new Exception('Erro de conexão com o banco de dados: ' . $conn->connect_error);
                }

                $stmt = $conn->prepare('SELECT uuid, username, email, password FROM user_account WHERE username = ? OR email = ?');
                $stmt->bind_param('ss', $this->login, $this->login);
                $stmt->execute();
                $result = $stmt->get_result();
                $row = $result->fetch_assoc();
                if($row === null)
                {
                    $stmt->close();
                    $conn->close();
                    throw new Exception('Email ou usuário não encontrado.');
                }
                if(!password_verify($this->password, $row['password']))
                {
                    $stmt->close();
                    $conn->close();
                    throw new Exception('Senha incorreta.');
                }
                $stmt->close();

                if($this->remember_me)
                {
                    setcookie('user_uuid', $row['uuid'], strtotime('+1 year'));
                }
                else
                {
                    $_SESSION['user_uuid'] = $row['uuid'];
                }

                $conn->close();

                return "Logado com sucesso.";
                
            }
            catch(Exception $e)
            {
                return $e->getMessage();
            }
        }
    }
?>