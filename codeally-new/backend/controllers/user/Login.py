from flask import make_response, session
import pymysql
import bcrypt
import hashlib
import re
import os

class Login:

    def __init__(self, login, password, remember):
        self.login = self.format_data(login)
        self.password = self.format_data(password)
        self.remember = remember
    
    def format_data(self, data):
        data = data.strip()
        data = re.sub(r"[\\'\"]", lambda match: "\\" + match.group(), data)
        return data
    
    def hash_uuid(self, user_uuid):
        key = os.getenv('SECRETKEY')
        encrypt = user_uuid + key
        hash = hashlib.sha256(encrypt.encode()).hexdigest()
        return hash

    def perform_login(self):
        try:
            if any(value == '' for value in[self.login, self.password]):
                raise Exception('Por favor, preencha todos os campos.')
            
            conn = pymysql.connect(
                host = 'localhost',
                user = 'root',
                password = '',
                database = 'codeally' 
            )
            with conn:
                cursor = conn.cursor()
                cursor.execute('SELECT uuid, username, email, password FROM user_account WHERE username = %s OR email = %s', (self.login, self.login))
                result = cursor.fetchall()

                if result is None:
                    cursor.close()
                    conn.close()
                    raise Exception('E-mail ou usuário não encontrado.')
                
                if not bcrypt.checkpw(self.password.encode('utf-8'), result['password'].encode('utf-8')):
                    cursor.close()
                    conn.close()
                    raise Exception('Senha incorreta.')
                cursor.close()
                conn.close()

                if self.remember:
                    hashed_uuid = self.hash_uuid(result['uuid'])
                    response = make_response("Logado com sucesso.")
                    response.set_cookie('user_uuid', value=hashed_uuid, max_age=315360000)
                    return response
                else:
                    hashed_uuid - self.hash_uuid(result['uuid'])
                    session['user_uuid'] = hashed_uuid
                    return 'Logado com sucesso.'
        except Exception as e:
            return str(e)