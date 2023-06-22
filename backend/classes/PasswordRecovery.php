<?php
    class PasswordRecovery {
        private $email = '';

        public function __construct($email)
        {
            $this->email = $this->formatData($email);
        }
    
        private function formatData($data)
        {
            $data = trim($data);
            $data = stripslashes($data);
            $data = htmlspecialchars($data);
            return $data;
        }

        public function recovery()
        {
            try 
            {
                $conn = new mysqli('localhost', 'root', '', 'codeally')
                if($conn->connect_error)
                {
                    throw new Exception('Erro de conexão com o banco de dados: ' . $conn->connect_error);
                }

                $stmt = $conn->prepare('SELECT uuid, email FROM user_account WHERE email = ?');
                $stmt->bind_param('s', $this->email);
                $stmt->execute();
                $result = $stmt->get_result();
                $row = $result->fetch_assoc();
                $stmt->close();

                if($row === null){
                    $conn->close();
                    throw new Exception('Email não encontrado.')
                }

                $new_password = $this->generateRandomPassword();

                $stmt = $conn->prepare('UPDATE user_account SET password = ? WHERE uuid = ?');
                $stmt->bind_param('ss', password_hash($new_password, PASSWORD_DEFAULT), $row['uuid']);
                $stmt->execute();
                $stmt->close();

                $conn->close();

                $this->sendPasswordEmail($row['email'], $new_password);
                
                return "Senha recuperada com sucesso. Verifique seu email para obter a novo senha.";
            }
            catch(Exception $e)
            {
                return $e->getMessage();
            }
        }

        private function generateRandomPassword($lenght = 8)
        {
            $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            $password = '';
            for ($i = 0; $i < $length; $i++) {
                $index = mt_rand(0, strlen($characters) - 1);
                $password .= $characters[$index];
            }
            return $password;
        }

        private function sendPasswordEmail($email, $new_password)
        {
                $from = '`codeally@gmail.com`';
                $subject = 'Recuperação de Senha';

                $message = "Sua nova senha é: " . $password;

                $headers = "From: $from" . "\r\n";
                $headers .= "Reply-To: $from" . "\r\n";
                $headers .= "MIME-Version: 1.0" . "\r\n";
                $headers .= "Content-Type: text/plain; charset=UTF-8" . "\r\n";

                if (mail($email, $subject, $message, $headers)) {
                    echo "Email com a nova senha enviado com sucesso.";
                } else {
                    echo "Falha ao enviar o email.";
                }
        }
    }
?>