<?php
    class Register
    {
        private $name = '';
        private $username = '';
        private $email = '';
        private $password = '';
        private $account_type = '';

        public function __construct($name, $username, $email, $password, $account_type)
        {
            $this->name = $this->formatData($name);
            $this->username = $this->formatData($username);
            $this->email = $this->formatData($email);
            $this->password = $this->formatData($password);
            $this->account_type = $account_type;
        }

        private function formatData($data)
        {
            $data = trim($data);
            $data = stripslashes($data);
            $data = htmlspecialchars($data);
            return $data;
        }

        public function register()
        {
            try
            {
                if(empty($this->name) || empty($this->username) || empty($this->email) || empty($this->password))
                {
                    throw new Exception('Por favor, preencha todos os campos.');
                }
                if(!filter_var($this->email, FILTER_VALIDATE_EMAIL))
                {
                    throw new Exception('Por favor, insira um endereço de email válido.');
                }

                $conn = new mysqli('localhost', 'root', '', 'codeally');
                if($conn->connect_error)
                {
                    throw new Exception('Erro de conexão com o banco de dados: ' . $conn->connect_error);
                }

                $stmt = $conn->prepare('SELECT username, email FROM user_account WHERE username = ? OR email = ?');
                $stmt->bind_param('ss', $this->username, $this->email);
                $stmt->execute();
                $result = $stmt->get_result();
                if($result->num_rows > 0){
                    $row = $result->fetch_assoc();
                    if($row['email'] == $this->email)
                    {
                        $stmt->close();
                        $conn->close();
                        throw new Exception('O email já está sendo utilizado.');
                    }
                    if($row['username'] = $this->username)
                    {
                        $stmt->close();
                        $conn->close();
                        throw new Exception('O usuário já está sendo utilizado.');
                    }
                }
                $stmt->close();

                if(strlen($this->password) < 8)
                {
                    throw new Exception("A senha deve conter pelo menos 8 caracteres.");
                }
                if(!preg_match('/\d/', $this->password))
                {
                    throw new Exception("A senha deve conter pelo menos um número.");
                }
                if(!preg_match('/[\W]+/', $this->password))
                {
                    throw new Exception("A senha deve conter pelo menos um caractere especial.");
                }

                $this->password = password_hash($this->password, PASSWORD_DEFAULT);
                $user_uuid = $conn->query('SELECT UUID()')->fetch_row()[0];

                $stmt = $conn->prepare('INSERT INTO user_account(uuid, username, email, password) VALUES (?,?,?,?)');
                $stmt->bind_param('ssss', $user_uuid, $this->username, $this->email, $this->password);
                $stmt->execute();
                $stmt->close();
                $stmt = $conn->prepare('INSERT INTO user_profile(uuid, name, account_type) VALUES (?,?,?)');
                $stmt->bind_param('sss', $user_uuid, $this->name, $this->account_type);
                $stmt->execute();
                $stmt->close();
                $conn->close();

                echo explode(' ', $this->name)[0] . ', cadastro realizado com sucesso. Redirecionando..<br><br>';
                echo '<script>setTimeout(function() { window.location.href = "login.php"; }, 2500);</script>';

            }   
            catch(Exception $e)
            {
                return $e->getMessage();
            }
        }
    }
?>