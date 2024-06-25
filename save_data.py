from flask import Flask, request

app = Flask(__name__)

@app.route('/submit', methods=['POST'])
def submit_form():
    data = request.form.get('data')
    if data:
        with open('data.txt', 'a') as file:
            file.write(data + '\n')
        return 'Data saved successfully'
    else:
        return 'No data received'

if __name__ == '__main__':
    app.run(debug=True)