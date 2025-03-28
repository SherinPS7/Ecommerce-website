import requests
from flask import Flask, request, jsonify

# Replace with your actual Gemini API key
API_KEY = 'AIzaSyDlRx6JVekOB3tWZO9IgqFJtyg6eukCXQ0'  # Gemini API Key you obtained
BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'

# Initialize Flask app
app = Flask(__name__)

# Function to send a message to Gemini API
def send_message_to_gemini(message):
    headers = {
        'Content-Type': 'application/json'
    }
    
    data = {
        "contents": [{
            "parts": [{"text": message}]
        }]
    }
    
    params = {
        'key': API_KEY  # Add API key as a query parameter
    }
    
    try:
        response = requests.post(BASE_URL, json=data, headers=headers, params=params)
        response.raise_for_status()  # Raise an error for bad status codes
        return response.json()  # Assuming Gemini API returns JSON
    except requests.exceptions.RequestException as e:
        return {'error': f'Request failed: {str(e)}'}

# Route to handle chatbot messages
@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message')
    
    if not user_input:
        return jsonify({'error': 'No message provided'}), 400
    
    gemini_response = send_message_to_gemini(user_input)
    
    return jsonify(gemini_response)

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
