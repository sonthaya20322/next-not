"use client"

import Image from 'next/image'
import AppName from '@/components/AppName'
import Footer from '@/components/footer'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

const STORAGE_BUCKET = 'task_bk'
const TASK_TABLE = 'task_tb'

export default function Page() {



    const router = useRouter();



    // state สำหรับเก็บค่าหัวข้องาน
    const [taskTitle, setTaskTitle] = useState('');
    const [detail, setDetail] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);


    // function สำหรับจัดการเลือกรูปภาพ + preview
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];


        if (file) {
            setImageFile(file); //กำหนดค่าให้กับ imageFile state เพื่ออัพโหลดไปยัง supabase storage
            setImagePreview(URL.createObjectURL(file)); // สร้าง URL สำหรับ preview รูปภาพ

        }
    };

    // function สำหรับรีเซ็ตค่าของ state ทั้งหมด
    const handleResetData = () => {
        setTaskTitle('');
        setDetail('');
        setIsCompleted(false);
        setImageFile(null);
        setImagePreview(null);
    }

    // function สำหรับบันทึกข้อมูลเพิ่มเติม
    const handleSaveData = async () => {
        // Validate UI
        if (taskTitle === '' || detail === '' || !imageFile) {
            Swal.fire({
                title: "คำเตือน!",
                icon: "warning",
                text: "กรุณากรอกข้อมูลให้ครบถ้วน",
                confirmButtonText: "ตกลง",
            });

            return;
        }
        // Uplode to Supabase Storage and get Image URL from Bucket
        // 1.1 ต้องมีการเปลี่ยนชื่อไฟล์เพื่อป้องกันการซ้ำกันของชื่อไฟล์
        const safeFileName = imageFile.name.replace(/[^a-zA-Z0-9._-]/g, '_');
        const newFileName = `dtisaujija_${Date.now()}_${safeFileName}`;
        // 1.2 สร้าง URL สำหรับอัพโหลดไฟล์
        const { error: uploadError } = await supabase.storage.from(STORAGE_BUCKET).upload(newFileName, imageFile);

        if (uploadError) {
            Swal.fire({
                title: "เกิดข้อผิดพลาด!",
                icon: "error",
                text: `ไม่สามารถอัพโหลดรูปภาพได้: ${uploadError.message}`,
                confirmButtonText: "ตกลง",
            });

            return;
        }

        // เอาที่อยู่ของรูปมาใส่ในตัวแปร imageUrl (get image url)
        const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(newFileName);
        const imageUrl = data.publicUrl;


        // Save to Supabase Database
        const { error: saveError } = await supabase.from(TASK_TABLE).insert({
            title: taskTitle,
            detail,
            is_completed: isCompleted,
            image_url: imageUrl
        });

        if (saveError) {
            Swal.fire({
                title: "เกิดข้อผิดพลาด!",
                icon: "error",
                text: `ไม่สามารถบันทึกข้อมูลได้: ${saveError.message}`,
                confirmButtonText: "ตกลง",
            });

            return;
        }

        handleResetData();

        await Swal.fire({
            title: "สําเร็จ!",
            icon: "success",
            text: "ข้อมูลถูกบันทึกเรียบร้อยแล้ว",
            confirmButtonText: "ตกลง",
        });

        router.back()

    }


    return (
        <div className="w-full">
            <div className="flex min-h-screen w-full flex-col items-center">
                <header className="w-full max-w-lg px-4 pt-8 text-center">
                    <AppName />
                </header>

                <main className="flex w-full max-w-lg flex-col items-center px-4 py-8">
                    <section className="flex w-full flex-col items-center">
                        <Image
                            src="https://bvumrcykwytgsmgylbun.supabase.co/storage/v1/object/public/task_bk/tasl_logo.png"
                            alt="Task App"
                            width={150}
                            height={100}
                            className="mb-8"
                        />

                        <div className="mt-2 w-full max-w-lg rounded-xl border border-gray-300 px-5 py-8 shadow-sm sm:px-8">
                            <h1 className="text-center text-2xl font-bold">
                                เพิ่มข้อมูลงาน
                            </h1>

                            <h3 className="mt-5 mb-2">
                                ป้อนหัวข้องาน
                            </h3>

                            <input
                                value={taskTitle}
                                onChange={(e) => setTaskTitle(e.target.value)}
                                type="text"
                                placeholder="หัวข้องาน"
                                className="w-full rounded-md border border-gray-300 bg-amber-50 p-2"
                            />

                            <h3 className="mt-5 mb-2">
                                ป้อนรายละเอียดงาน
                            </h3>

                            <textarea
                                value={detail}
                                onChange={(e) => setDetail(e.target.value)}
                                rows={5}
                                className="w-full resize-y rounded-md border border-gray-300 bg-amber-50 p-2"
                                placeholder="รายละเอียดงาน"
                            ></textarea>

                            <h3 className="mt-5 mb-2">
                                เลือกรูป
                            </h3>

                            <input type="file" id="selectImageFile" onChange={handleImageChange}
                                className="hidden" accept="image/*" />
                            <label htmlFor="selectImageFile" className="block w-full rounded-md border border-gray-300 bg-amber-50 p-2 text-center transition-colors duration-300 hover:cursor-pointer hover:bg-blue-500 hover:text-white">
                                เลือกรูป
                            </label>
                            {/* image preview */}
                            {imagePreview && (
                                <div>
                                    <Image src={imagePreview} alt="Preview" width={100} height={100} />
                                </div>
                            )}

                            <h3 className="mt-5 mb-2">
                                สถานะงาน
                            </h3>
                            <select value={isCompleted == true ? '1' : '0'}
                                onChange={(e) => setIsCompleted(e.target.value == '1')}
                                className="w-full rounded-md border border-gray-300 bg-amber-50 p-2">
                                <option value="1">เสร็จสิ้น</option>
                                <option value="0">
                                    รอดำเนินการ
                                </option>
                            </select>

                            <button onClick={handleSaveData}
                                className="mt-5 rounded-md bg-blue-500 px-4 py-2 text-white transition-colors duration-300 hover:bg-blue-600">
                                บันทึกข้อมูลเพิ่มเติม
                            </button>


                            <button onClick={handleResetData}
                                className="mt-5 rounded-md bg-red-500 px-4 py-2 text-white transition-colors duration-300 hover:bg-red-600">
                                รีเซ็ตข้อมูล
                            </button>

                        </div>

                        <div className="mt-5 w-full text-center text-sm text-gray-600">
                            Link to <a href="/hometask" className="font-medium text-blue-600 transition-colors hover:text-blue-800 hover:underline">Home Task</a>
                        </div>

                    </section>
                </main>

                <footer className="mt-auto w-full max-w-lg px-4 pb-8">
                    <Footer />
                </footer>
            </div>
        </div>
    );
}