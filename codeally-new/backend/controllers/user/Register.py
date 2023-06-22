import pymysql
import bcrypt
import uuid
import re

class Register:

    def __init__(self, username, email, password):
        self.username = self.format_data(username)
        self.email = self.format_data(email)
        self.password = self.format_data(password)

    def format_data(self, data):
        data = data.strip()
        data = re.sub(r"[\\'\"]", lambda match: "\\" + match.group(), data)
        return data
    
    def perform_register(self):
        try:
            # Verificando se todos os campos estão preenchidos:
            if any(value == '' for value in[self.username, self.email, self.password]):
                raise Exception('Por favor, preencha todos os campos.')
            # Verificando se o e-mail é valido:
            if not re.match(r'^[\w\.-]+@[\w\.-]+\.\w+$', self.email):
                raise Exception('Por favor, digite um e-mail válido.')
            
            conn = pymysql.connect(
                host = 'localhost',
                user = 'root',
                password = '',
                database = 'codeally'
            )

            with conn:
                # Verificando se o endereço de e-mail ou usuário já estão sendo utilizados:
                cursor = conn.cursor()
                cursor.execute('SELECT username, email FROM user_account WHERE username = %s OR email = %s', (self.username, self.email))
                result = cursor.fetchoone()
                if result:
                    if result[0] == self.username:
                        raise Exception('Nome de usuário já está sendo utilizado.')
                    if result[1] == self.email:
                        raise Exception('O endereço de e-mail já está sendo utilizado.')
                cursor.close()

                # Verificando senha:
                if len(self.password) < 8:
                    raise Exception('A senha deve ter no mínimo 8 caracteres.')
                if re.search(r'\d', self.password):
                    raise Exception('A senha deve conter pelo menos um número.')
                if re.search(r'\W', self.password):
                    raise Exception('A senha deve conter pelo menos um caractere especial.')
                
                # Criptografando senha:
                hashed_password = bcrypt.hashpw(self.password.encode('utf-8'), bcrypt.gensalt())
                
                # Criando UUID:
                user_uuid = uuid.uuid4()

                # Inserindo dados ao banco:
                cursor = conn.cursor()
                cursor.execute('INSERTO INTO user_account(uuid, username, email, password) VALUES (%s, %s, %s, %s)',(user_uuid, self.username, self.email, hashed_password))

                conn.commit()
                cursor.close()
                conn.close()
        except Exception as e:
            return str(e)