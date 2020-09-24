import smtplib
from email.mime.text import MIMEText

class Mailer:
    server = None
    bot_email = ""
    # init email server
    def __init__(self, bot_email: str, bot_password: str):
        self.server = smtplib.SMTP('smtp.yandex.ru', 587)
        self.server.ehlo()
        self.server.starttls()
        self.server.login(bot_email, bot_password)
        self.bot_email = bot_email

    # close email server
    def close_email(self):
        self.server.quit()

    # send a text via email
    def send_email(self, dest_email: str, text: str):
        msg = MIMEText(text.encode('utf-8'), 'plain', 'utf-8')
        msg['Subject'] = 'You Are Fired'
        msg['From'] = self.bot_email
        msg['To'] = dest_email
        self.server.send_message(msg)

    def __del__(self):
        self.close_email()
