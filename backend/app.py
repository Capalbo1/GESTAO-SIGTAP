from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/login', methods=['POST'])
def handle_login():
    data = request.get_json()
    # Mock - Substitua por validação real
    if data['email'] == 'admin@sigtap.com' and data['password'] == '123':
        return jsonify({ 'success': True, 'token': 'fake-jwt-token' })
    return jsonify({ 'success': False }), 401

if __name__ == '__main__':
    app.run(port=5000, debug=True)