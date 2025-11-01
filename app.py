from flask import Flask, render_template, request, jsonify, send_from_directory
import os
from datetime import datetime

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('Index.html')

@app.route('/send-message', methods=['POST'])
def send_message():
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'success': False, 'message': 'No data received'}), 400
        
        name = data.get('name', '')
        email = data.get('email', '')
        subject = data.get('subject', '')
        message_text = data.get('message', '')
        
        # Log the message to console (you can see this in Render logs)
        print("\n" + "="*70)
        print("📧 NEW CONTACT FORM MESSAGE")
        print("="*70)
        print(f"Date: {datetime.now()}")
        print(f"From: {name}")
        print(f"Email: {email}")
        print(f"Subject: {subject}")
        print(f"Message:\n{message_text}")
        print("="*70 + "\n")
        
        # Return success (message is logged, user can contact you directly via email)
        return jsonify({
            'success': True, 
            'message': f'Thank you {name}! I\'ll respond to {email} soon. You can also email me directly at nishalreddyreddypally724@gmail.com'
        }), 200
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return jsonify({'success': False, 'message': f'Error: {str(e)}'}), 500

@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static', path)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 10000))
    app.run(host='0.0.0.0', port=port, debug=False)