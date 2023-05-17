<?php
    class atualizarPerfil{
        private $name = '';
        private $username = '';
        private $email = '';
        private $password = '';

        public function __construct($name, $username, $email, $password){
            $this->name = $this->formatData($name);
            $this->username = $this->formatData($username);
            $this->email = $this->formatData($email);
            $this->password = $this->formatData($password);
        }

        private function formatData($data){
            $data = trim($data);
            $data = stripslashes($data);
            $data = htmlspecialchars($data);
            return $data;
        }

        public function atualizarPerfil(){
            try {
                if(empty($this->name) || empty($this->username) || empty($this->email) || empty($this->password)){
                    throw new Exception("Por favor, preencha todos os campos.");
                }
                if(!filter_var($this->email, FILTER_VALIDATE_EMAIL)){
                    throw new Exception("Por favor, insira um endereço de email válido.");
                }
                if(strlen($this->password) < 8){
                    throw new Exception("A senha deve conter pelo menos 8 caracteres.");
                }
                if(!preg_match('/\d/', $this->password)){
                    throw new Exception("A senha deve conter pelo menos um número.");
                }
                if(!preg_match('/[\W]+/', $this->password)){
                    throw new Exception("A senha deve conter pelo menos um caractere especial.");
                }
                $bd = new mysqli("localhost", "root", "", "codeally");
                if($bd->connect_error){
                    throw new Exception("Erro de conexão com o banco de dados: " . $bd->connect_error);
                }
                $stmt = $bd->prepare("SELECT username, email FROM user_account WHERE username = ? OR email = ?");
                $stmt->bind_param('ss', $this->username, $this->email);
                $stmt->execute();
                $result = $stmt->get_result();
                if($result->num_rows > 0){
                    $row = $result->fetch_assoc();
                    if($row["email"] == $this->email){
                        $stmt->close();
                        $bd->close();
                        throw new Exception("O email inserido já está em uso.");
                    }
                    if($row["username"] == $this->username){
                        $stmt->close();
                        $bd->close();
                        throw new Exception("O nome de usuário inserido já está em uso.");
                    }
                }
                $stmt->close();
                
            }

        }
    }
?>