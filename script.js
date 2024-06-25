document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault(); // หยุดการโหลดหน้าใหม่
    
    let formData = new FormData(this);
    let jsonData = {};
    
    formData.forEach(function(value, key) {
        jsonData[key] = value;
    });

    // ดึงข้อมูลปัจจุบันของไฟล์ data.txt จาก GitHub ก่อน
    fetch('https://api.github.com/repos/your-username/your-repo/contents/data.txt', {
        headers: {
            'Authorization': 'token your-github-token' // ใส่ GitHub Token ของคุณที่นี่
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // อัปเดตข้อมูลใน data.txt ด้วยข้อมูลที่เพิ่งส่งเข้ามา
        updateFileInGitHub(data, jsonData);
    })
    .catch(error => {
        console.error('Error fetching file data:', error);
        // จัดการข้อผิดพลาดเช่น แสดงข้อความผิดพลาดหรือลองส่งข้อมูลอีกครั้ง
    });
});

function updateFileInGitHub(fileData, newData) {
    // Decode content from base64
    let currentContent = atob(fileData.content);
    let updatedContent = `${currentContent}\n${JSON.stringify(newData)}`; // เพิ่มข้อมูลใหม่ด้านล่างข้อมูลเดิม

    // ส่งข้อมูลอัปเดตไปยัง GitHub
    fetch(fileData.url, {
        method: 'PUT',
        headers: {
            'Authorization': 'token your-github-token', // ใส่ GitHub Token ของคุณที่นี่
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: 'Update data in data.txt',
            content: btoa(updatedContent), // Encode เนื้อหาใหม่เป็น base64
            sha: fileData.sha, // SHA hash ของไฟล์ปัจจุบันที่ต้องการอัปเดต
            branch: 'main' // หรือ branch ที่คุณใช้
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Data successfully updated:', data);
        // สามารถเพิ่มการปรับปรุง UI หรือการแจ้งเตือนได้ตามความต้องการ
    })
    .catch(error => {
        console.error('Error updating data:', error);
        // จัดการข้อผิดพลาดเช่น แสดงข้อความผิดพลาดหรือลองส่งข้อมูลอีกครั้ง
    });
}