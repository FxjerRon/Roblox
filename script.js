// script.js

document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault(); // ป้องกันการโหลดหน้าใหม่เมื่อ submit ฟอร์ม

    // ดึงค่าจากฟอร์ม
    let formData = new FormData(this);
    let formDataObject = {};
    formData.forEach(function(value, key){
        formDataObject[key] = value;
    });

    // สร้างข้อความที่จะเขียนลงในไฟล์ .txt
    let textToWrite = `Name: ${formDataObject.name}\nEmail: ${formDataObject.email}\nMessage: ${formDataObject.message}`;

    // เขียนข้อมูลลงในไฟล์ .txt บน GitHub
    writeTextToFile(textToWrite);
});

function writeTextToFile(text) {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'data.txt';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
}
