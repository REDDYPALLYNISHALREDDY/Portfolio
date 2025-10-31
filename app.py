from flask import Flask, render_template, request, jsonify, send_from_directory
from flask_mail import Mail, Message
import os
import sys

app = Flask(__name__)

# Gmail Configuration - MUST match exactly
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = 'nishalreddyreddypally724@gmail.com'
app.config['MAIL_PASSWORD'] = 'kompfbtjltpbuhag'  # ← PUT YOUR FULL 16-CHAR PASSWORD HERE
app.config['MAIL_DEFAULT_SENDER'] = 'nishalreddyreddypally724@gmail.com'
app.config['MAIL_DEBUG'] = True  # Shows email debug info

mail = Mail(app)

@app.route('/')
def home():
    return render_template('Index.html')

@app.route('/send-message', methods=['POST', 'OPTIONS'])
def send_message():
    if request.method == 'OPTIONS':
        return '', 200
    
    try:
        print("\n" + "="*70)
        print("📧 CONTACT FORM SUBMISSION RECEIVED")
        print("="*70)
        
        # Get JSON data
        data = request.get_json()
        print(f"Raw data received: {data}")
        
        if not data:
            print("❌ ERROR: No data in request")
            return jsonify({'success': False, 'message': 'No data'}), 400
        
        name = data.get('name', '')
        email = data.get('email', '')
        subject = data.get('subject', '')
        message_text = data.get('message', '')
        
        print(f"✓ Name: {name}")
        print(f"✓ Email: {email}")
        print(f"✓ Subject: {subject}")
        print(f"✓ Message: {message_text[:50]}...")
        
        print("\n🔄 Creating email message...")
        
        # Create email
        msg = Message(
            subject=f"Portfolio: {subject}",
            recipients=['nishalreddyreddypally724@gmail.com'],
            body=f"""
NEW PORTFOLIO MESSAGE
═════════════════════════════════════

FROM: {name}
EMAIL: {email}
SUBJECT: {subject}

MESSAGE:
{message_text}

═════════════════════════════════════
Sent from Portfolio Contact Form
            """,
            reply_to=email
        )
        
        print("🔄 Sending email via Gmail SMTP...")
        
        # Send email
        mail.send(msg)
        
        print("✅ EMAIL SENT SUCCESSFULLY!")
        print("="*70 + "\n")
        
        return jsonify({
            'success': True, 
            'message': 'Message sent! Check your email inbox (or spam folder).'
        }), 200
        
    except Exception as e:
        print("\n" + "="*70)
        print("❌ EMAIL ERROR")
        print("="*70)
        print(f"Error type: {type(e).__name__}")
        print(f"Error message: {str(e)}")
        import traceback
        traceback.print_exc()
        print("="*70 + "\n")
        
        return jsonify({
            'success': False,
            'message': f'Failed: {str(e)}'
        }), 500

@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static', path)

if __name__ == '__main__':
    print("\n" + "="*70)
    print("🚀 PORTFOLIO SERVER STARTING")
    print("="*70)
    print(f"📧 Email: nishalreddyreddypally724@gmail.com")
    print(f"🔑 Password: {app.config['MAIL_PASSWORD'][:4]}************")
    print(f"📡 Server: http://127.0.0.1:5000")
    print("="*70 + "\n")
    
    app.run(debug=True, host='0.0.0.0', port=5000)
