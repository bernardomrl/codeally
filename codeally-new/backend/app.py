from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def landing():
    return render_template('index.html')

@app.route('/login', methods=['POST'])
def login():
    login = request.form['login']
    password = request.form['password']
    remember = request.form['remember']
    

if __name__ == '__main__':
    app.run(debug=True)