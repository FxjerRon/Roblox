from flask import Flask, request, render_template_string

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        message = request.form['message']

        # บันทึกข้อมูลลงในไฟล์ .txt
        with open('data.txt', 'a') as file:
            file.write(f'Name: {name}\nEmail: {email}\nMessage: {message}\n\n')

        return 'Data saved successfully!'
    else:
        # อ่านและส่งคืนไฟล์ index.html
        return render_template_string(open('index.html').read())

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8888, debug=True)
