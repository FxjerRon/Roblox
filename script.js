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

    // ส่งคำร้องขอ POST ไปยัง GitHub API เพื่อสร้างหรืออัปเดตไฟล์ .txt ใน repository
    saveDataToFile(textToWrite);
});

async function saveDataToFile(data) {
    const repoOwner = 'your-github-username'; // ชื่อผู้ใช้ GitHub ของคุณ
    const repoName = 'your-repository-name'; // ชื่อ repository ของคุณ
    const filename = 'data.txt'; // ชื่อไฟล์ที่ต้องการบันทึก

    const token = 'your-personal-access-token'; // PAT ที่คุณสร้างขึ้น
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filename}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                Authorization: `token ${token}`,
                Accept: 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: 'Add data.txt via API',
                content: btoa(data) // encode ข้อมูลให้อยู่ในรูปแบบ Base64
            })
        });

        if (response.ok) {
            console.log('File data.txt created or updated successfully.');
            // ทำสิ่งที่คุณต้องการหลังจากบันทึกไฟล์สำเร็จ
        } else {
            console.error('Failed to create or update file data.txt:', response.statusText);
        }
    } catch (error) {
        console.error('Error saving data to file:', error.message);
    }
}