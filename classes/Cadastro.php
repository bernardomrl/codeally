<?php
    class Cadastro{
        private $name = '';
        private $username = '';
        private $email = '';
        private $password = '';
        private $account_type = '';

        public function __construct($name, $username, $email, $password, $account_type){
            $this->name = $this->formatData($name);
            $this->username = $this->formatData($username);
            $this->email = $this->formatData($email);
            $this->password = $this->formatData($password);
            $this->account_type = $account_type;
        }

        private function formatData($data){
            $data = trim($data);
            $data = stripslashes($data);
            $data = htmlspecialchars($data);
            return $data;
        }

        public function cadastrar(){
            try{
                // 01 - Validação de campos.
                // 01.1 - Verificando se todos os campos estao preenchidos.
                if(empty($this->name) || empty($this->username) || empty($this->email) || empty($this->password)){
                    throw new Exception("Por favor, preencha todos os campos.");
                }

                // 01.2 - Verificando se o email é valido.
                if(!filter_var($this->email, FILTER_VALIDATE_EMAIL)){
                    throw new Exception("Por favor, insira um endereço de email válido.");
                }

                $con = new mysqli("localhost", "root", "", "codeally");
                if($con->connect_error){
                    throw new Exception("Erro de conexão com o banco de dados: " . $con->connect_error);
                }

                //01.3 - Verifica o email e o usuário já existem no banco.
                $stmt = $con->prepare("SELECT username, email FROM user_account WHERE username = ? OR email = ?");
                $stmt->bind_param('ss', $this->username, $this->email);
                $stmt->execute();
                $result = $stmt->get_result();
                if($result->num_rows > 0){
                    $row = $result->fetch_assoc();
                    if($row["email"] == $this->email){
                        $stmt->close();
                        $con->close();
                        throw new Exception("O email já está sendo utilizado.");
                    }
                    if($row["username"] == $this->username){
                        $stmt->close();
                        $con->close();
                        throw new Exception("O usuário já está sendo utilizado.");
                    }
                }
                $stmt->close();

                // 01.4 - Segurança da senha.
                if(strlen($this->password) < 8){
                    throw new Exception("A senha deve conter pelo menos 8 caracteres.");
                }
                if(!preg_match('/\d/', $this->password)){
                    throw new Exception("A senha deve conter pelo menos um número.");
                }
                if(!preg_match('/[\W]+/', $this->password)){
                    throw new Exception("A senha deve conter pelo menos um caractere especial.");
                }

                // 02 - Inserçao de dados ao banco.
                // 02.1 - Criptografando senha.
                $hashedPass = password_hash($this->password, PASSWORD_DEFAULT);
                // 02.2 - Gerando UUID.
                $user_uuid = $con->query("SELECT UUID()")->fetch_row()[0];
                // 02.3 - Inserindo dados na tabela user_account.
                $stmt = $con->prepare("INSERT INTO user_account(uuid, username, email, password) VALUES (?,?,?,?)");
                $stmt->bind_param("ssss", $user_uuid, $this->username, $this->email, $hashedPass);
                $stmt->execute();
                $stmt->close();
                // 02.4 - Inserindo dados na tabela user_profile.
                $stmt = $con->prepare("INSERT INTO user_profile(uuid, name, account_type) VALUES (?,?,?)");
                $stmt->bind_param("sss", $user_uuid, $this->name, $this->account_type);
                $stmt->execute();
                $stmt->close();

                $con->close();

                return explode(" ", $this->name)[0] . ", cadastro realizado com sucesso.";
            }catch (Exception $e){
                return $e->getMessage();
            }
        }
    }
?>