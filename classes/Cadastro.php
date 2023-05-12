<?php
    class Cadastro{
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
                // 01.3 - Segurança da senha.
                if(strlen($this->password) < 8){
                    throw new Exception("A senha deve conter pelo menos 8 caracteres.");
                }
                if(!preg_match('/\d/', $this->password)){
                    throw new Exception("A senha deve conter pelo menos um número.");
                }
                if(!preg_match('/[\W]+/', $this->password)){
                    throw new Exception("A senha deve conter pelo menos um caractere especial.");
                }

                // 02 - Validações com o banco de dados.
                // 02.1 - Conexao com o banco.
                $bd = new mysqli("localhost", "root", "", "codeally");
                // 02.2 - Verifica a conexao com o banco.
                if($bd->connect_error){
                    throw new Exception("Erro de conexão com o banco de dados: " . $bd->connect_error);
                }
                //02.3 - Verifica o email e o usuário já existem no banco.
                $stmt = $bd->prepare("SELECT username, email FROM user_account WHERE username = ? OR email = ?");
                $stmt->bind_param('ss', $this->username, $this->email);
                $stmt->execute();
                $result = $stmt->get_result();
                if($result->num_rows > 0){
                    $row = $result->fetch_assoc();
                    if($row["email"] == $this->email){
                        $stmt->close();
                        $bd->close();
                        throw new Exception("O email já está sendo utilizado.");
                    }
                    if($row["username"] == $this->username){
                        $stmt->close();
                        $bd->close();
                        throw new Exception("O usuário já está sendo utilizado.");
                    }
                }
                $stmt->close();

                // 03 - Inserçao de dados ao banco.
                // 03.1 - Criptografando senha.
                $hashedPass = password_hash($this->password, PASSWORD_DEFAULT);
                // 03.2 - Gerando UUID.
                $user_uuid = $bd->query("SELECT UUID()")->fetch_row()[0];
                // 03.3 - Inserindo dados na tabela user_account.
                $stmt = $bd->prepare("INSERT INTO user_account(uuid, username, email, password) VALUES (?,?,?,?)");
                $stmt->bind_param("ssss", $user_uuid, $this->username, $this->email, $hashedPass);
                $stmt->execute();
                $stmt->close();
                // 03.4 - Inserindo dados na tabela user_profile.
                $stmt = $bd->prepare("INSERT INTO user_profile(uuid, name) VALUES (?,?)");
                $stmt->bind_param("ss", $user_uuid, $this->name);
                $stmt->execute();
                $stmt->close();

                $bd->close();

                return explode(" ", $this->name)[0] . ", cadastro realizado com sucesso.";
            }catch (Exception $e){
                return $e->getMessage();
            }
        }
    }
?>