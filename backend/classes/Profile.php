<?php
    class Profile
    {
        private $user_uuid = '';
        // user_account
        private $username = '';
        private $email = '';
        private $password = '';
        // user_profile
        private $name = '';
        private $age = null;
        // alteração de senha
        private $password_change = false;
        private $password_new = '';
        private $password_new_confirm = '';

        public function __construct($user_uuid)
        {
            $this->user_uuid = $user_uuid;
        }

        // Setters
        public function setUsername($username)
        {
            $this->username = $this->formatData($username);
        }
        public function setEmail($email)
        {
            $this->email = $this->formatData($email);
        }
        public function setPassword($password)
        {
            $this->password = $this->formatData($password);
        }
        public function setName($name)
        {
            $this->name = $this->formatData($name);
        }
        public function setAge($age)
        {
            $this->age = $age;
        }
        public function setPasswordChange($password_change)
        {
            $this->password_change = $password_change;
        }
        public function setPasswordNew($password_new)
        {
            $this->password_new = $this->formatData($password_new);
        }
        public function setPasswordNewConfirm($password_new_confirm)
        {
            $this->password_new_confirm = $this->formatData($password_new_confirm);
        }

        private function formatData($data)
        {
            $data = trim($data);
            $data = stripslashes($data);
            $data = htmlspecialchars($data);
            return $data;
        }

        public function updateProfile($user)
        {
            try
            {
                if(empty($this->name) || empty($this->username) || empty($this->email) || ($this->password_change && empty($this->password_new)))
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

                if ($this->email !== $user['email']) {
                    $stmt = $conn->prepare('SELECT email FROM user_account WHERE email = ?');
                    $stmt->bind_param('s', $this->email);
                    $stmt->execute();
                    $result = $stmt->get_result();
                    if ($result->num_rows > 0) {
                        $stmt->close();
                        $conn->close();
                        throw new Exception('O email inserido já está em uso.');
                    }
                    $stmt->close();
                }
                
                if ($this->username !== $user['username']) {
                    $stmt = $conn->prepare('SELECT username FROM user_account WHERE username = ?');
                    $stmt->bind_param('s', $this->username);
                    $stmt->execute();
                    $result = $stmt->get_result();
                    if ($result->num_rows > 0) {
                        $stmt->close();
                        $conn->close();
                        throw new Exception('O nome de usuário inserido já está em uso.');
                    }
                    $stmt->close();
                }

                if($this->password_change)
                {
                    $stmt = $conn->prepare('SELECT password FROM user_account WHERE uuid = ?');
                    $stmt->bind_param('s', $this->user_uuid);
                    $stmt->execute();
                    $result = $stmt->get_result();
                    $row = $result->fetch_assoc();
                    $stmt->close();
                    if(!password_verify($this->password, $row['password']))
                    {
                        throw new Exception('A senha atual está incorreta.');
                    }

                    if($this->password_new == $this->password)
                    {
                        throw new Exception('A nova senha deve ser diferente da senha atual.');
                    }

                    if(strlen($this->password_new) < 8)
                    {
                        throw new Exception('A senha deve conter pelo menos 8 caracteres.');
                    }

                    if(!preg_match('/\d/', $this->password_new))
                    {
                        throw new Exception('A senha deve conter pelo menos um número.');
                    }

                    if(!preg_match('/[\W]+/', $this->password_new))
                    {
                    throw new Exception('A senha deve conter pelo menos um caractere especial.');
                    }

                    if(empty($this->password_new_confirm))
                    {
                        throw new Exception('Por favor, confirme a nova senha.');
                    }

                    if($this->password_new != $this->password_new_confirm)
                    {
                        throw new Exception('As senhas não coincidem.');
                    }

                    $this->password_new = password_hash($this->password_new, PASSWORD_DEFAULT);
                    $stmt = $conn->prepare('UPDATE user_account SET password = ? WHERE uuid = ?');
                    $stmt->bind_param('ss', $this->password_new, $this->user_uuid);
                    $stmt->execute();
                    $stmt->close();
                }

                $stmt = $conn->prepare('UPDATE user_account SET username = ?, email = ? WHERE uuid = ?');
                $stmt->bind_param('sss', $this->username, $this->email, $this->user_uuid);
                $stmt->execute();
                $stmt->close();
                $stmt = $conn->prepare('UPDATE user_profile SET name = ?, age = ? WHERE uuid = ?');
                $stmt->bind_param('sis', $this->name, $this->age, $this->user_uuid);
                $stmt->execute();
                $stmt->close();
                $conn->close();

                return "Dados atualizados com sucesso.";

            } 
            catch (Exception $e)
            {
                return $e->getMessage();
            }
        }

        public function getProfile()
        {
            try
            {
                $conn = new mysqli('localhost', 'root', '', 'codeally');
                if($conn->connect_error)
                {
                    throw new Exception('Erro de conexão com o banco de dados: ' . $conn->connect_error);
                }
                
                $stmt = $conn->prepare('SELECT ua.username, ua.email, up.name, up.age FROM user_account ua JOIN user_profile up ON ua.uuid = up.uuid WHERE ua.uuid = ?');
                $stmt->bind_param('s', $this->user_uuid);
                $stmt->execute();
                $result = $stmt->get_result();
                $user = $result->fetch_assoc();
                $stmt->close();
                $conn->close();

                return $user;
            }
            catch(Exception $e)
            {
                return $e->getMessage();
            }
        }
    }
?>