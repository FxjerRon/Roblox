<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // ตัวอย่างการบันทึกข้อมูลลงในไฟล์ .txt
    $file = 'data.txt';
    $current = file_get_contents($file);
    $current .= "Name: $name\nEmail: $email\nMessage: $message\n\n";
    file_put_contents($file, $current);

    // ส่งข้อมูลกลับหน้าเว็บหลังจากบันทึก
    echo "ข้อมูลได้ถูกบันทึกเรียบร้อยแล้ว!";
}
?
