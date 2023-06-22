import pymysql
import bcrypt
import re

class Profile:
    def __init__(self, user_uuid):
        self.user_uuid = user_uuid

    # Setters:
    
    def set_username(self, username):
        self.username = self.format_data(username)
    def set_email(self, email):
        self.email = self.format_data(email)
    def set_name(self, name):
        self.name = self.format_data(name)
    def set_age(self, age):
        self.age = age
    
    # Password setters:

    def set_password(self, password):
        self.password = self.format_data(password)
    def set_password_change(self, password_change):
        self.password_change = password_change
    def set_password_new(self, password_new):
        self.password_new = self.format_data(password_new)
    def set_password_new_confirm(self, password_new_confirm):
        self.password_new_confirm = self.format(password_new_confirm)

    def format_data(self, data):
        data = data.strip()
        data = re.sub(r"[\\'\"]", lambda match: "\\" + match.group(), data)
        return data

    def get_profile(self):

        conn = pymysql.connect(
            host = 'localhost',
            user = 'root',
            password = '',
            database = 'codeally'
        )

        with conn:
            cursor = conn.cursor()
            # Recuperando dados do banco:
            cursor.execute('SELECT ua.username, ua.email, up.name, up.age'
                        'FROM user_account ua JOIN user_account up ON ua.uuid = up.uuid WHERE ua.uuid = %s',
                        (self.user_uuid))
            result = cursor.fetchone()
            
            cursor.close()
            conn.close()
            return result
    
    def update_profile(self, user):
        try:
            # Verificando se todos os campos foram preenchidos.
            if (self.name == '' or
                self.username == '' or
                self.email == '' or
                (self.password_change and self.password_new == '')):
                raise Exception('Por favor, preencha todos os campos.')
            # Verificando se o novo e-mail é valido.
            if not re.match(r'^[\w\.-]+@[\w\.-]+\.\w+$', self.email):
                raise Exception('Por favor, digite um e-mail válido.')
            
            conn = pymysql.connect(
                host = 'localhost',
                user = 'root',
                password = '',
                database = 'codeally'
            )

            with conn:
                # Verificando se o e-mail é igual ao da conta atual, ou se ja está cadastrado no banco:
                if self.email != user['email']:
                    cursor = conn.cursor()
                    cursor.execute('SELECT email FROM user_account WHERE email = %s', (self.email))
                    result = cursor.fetchone()
                    if result:
                        cursor.close()
                        conn.close()
                        raise Exception('O e-mail inserido já está sendo utilizado.')
                    cursor.close() 
                
                # Verificando se o nome de usuário é igual ao da conta atual, ou se ja está cadastrado no banco:
                if self.username != user['username']:
                    cursor = conn.cursor()
                    cursor.execute('SELECT username FROM user_account WHERE username = %s', (self.username))
                    result = cursor.fetchone()
                    if result:
                        cursor.close()
                        conn.close()
                        raise Exception('O nome de usuário já está sendo utilizado.')
                    
                # Alteração de senha:
                if self.password_change:
                    # Consoltando senha no banco:
                    cursor = conn.cursor()
                    cursor.execute('SELECT password FROM user_account WHERE uuid = %s', (self.user_uuid))
                    result = cursor.fetchone()

                    # Verificando se a senha está correta, comparando com a senha criptografada.
                    if not result or not bcrypt.checkpw(self.password.encode('utf-8'), result['password'].encode('utf-8')):
                        raise Exception('A senha atual está incorreta.')
                    
                    # Verificando se a senha nova é igual a antiga:
                    if self.password_new == self.password:
                        raise Exception('A nova senha deve ser diferente da atual.')
                    
                    # Verificando se a senha é segura:
                    if len(self.password_new) < 8:
                        raise Exception('A nova senha deve ter pelo menos 8 caracteres.')
                    if not any(char.isdigit() for char in self.password_new):
                        raise Exception('A senha deve conter pelo menos um número.')
                    if not any(char.isalnum() for char in self.password_new):
                        raise Exception('A senha deve conter pelo menos um caractere especial.')
                    
                    # Verificando se o campo de senha está preenchido:
                    if self.password_new_confirm == '':
                        raise Exception('Por favor, confirme a nova senha.')
                    
                    # Verificando se a senha nova com a confirmação do mesmo:
                    if self.password_new != self.password_new_confirm:
                        raise Exception('As senhas não coincidem.')
                    cursor.close()

                    # Criptografando a nova senha:
                    hashed_password = bcrypt.hashpw(self.password_new.encode('utf-8'), bcrypt.gensalt())
                    cursor.execute('UPDATE user_account SET password = %s WHERE uuid = %s',(hashed_password, self.user_uuid))
                    conn.commit()
                    cursor.close()

                # Atualizando user_account:
                cursor = conn.cursor()
                cursor.execute('UPDATE user_account SET username = %s, email = %s WHERE uuid = %s', (self.username, self.email, self.user_uuid))    
                cursor.close()

                # Atualizando user_profile:
                cursor = conn.cursor()
                cursor.execute('UPDATE user_profile SET age = %s, name = %s WHERE uuid = %s', (self.age, self.name, self.user_uuid))
                cursor.close()
                conn.close()

                return 'Dados atualizados com sucesso.'
        except Exception as e:
            return str(e)