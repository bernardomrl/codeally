import secrets
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import re

class Recovery:
    def __init__(self, email):
        self.email = self.format_data(email)
    
    def format_data(self, data):
        data = data.strip()
        data = re.sub(r"[\\'\"]", lambda match: "\\" + match.group(), data)
        return data
    
    def generate_token(self):
        token = secrets.token.urlsafe(32)
        return token
    
    def send_email(self, recipient_email, subject, body):
        # Configurar informações do remetente
        sender_email = "codeally.help@gmail.com"
        sender_password = '2GrX^Ldg012FC7EAwULOV*xEzRlkygALpt4T2RCeU^0Hf!niRJ'

        message = MIMEMultipart()
        message["From"] = sender_email
        message["To"] = recipient_email
        message["Subject"] = subject

        message.attach(MIMEText(body, "plain"))

        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.send_message(message)
    
    def perform_recovery(self):
        # Gerar o código único/token
        recovery_token = self.generate_token()
        
        # Enviar o e-mail com o código de recuperação
        subject = "Recuperação de Senha"
        body = f"Olá, você solicitou a recuperação de senha. Use o seguinte código para alterar sua senha: {recovery_token}"
        self.send_email(self.email, subject, body)