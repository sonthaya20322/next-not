"use client"

import Image from 'next/image'
import AppName from '@/components/AppName'
import Footer from '@/components/footer'
import Link from 'next/link'
import { useState } from 'react'
import Swal from 'sweetalert2'

export default function Page() {
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
    const handleSaveData = () => {
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
        


        // Save to Supabase Database
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

                        <div className="w-200 mt-10 mx-auto border border-gray-400 rounded-x1 px-20 py-10">
                            <h1 className="text-center text-2x1 font-bold">
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
                                className="w-full p-2 border border-gray-300 rounded bg-amber-40"
                            />

                            <h3 className="mt-5 mb-2">
                                ป้อนรายละเอียดงาน
                            </h3>

                            <textarea
                                value={detail}
                                onChange={(e) => setDetail(e.target.value)}
                                rows={5}
                                className="w-full border rouded-mb p-2 bg-amber-40"
                                placeholder="รายละเอียดงาน"
                            ></textarea>

                            <h3 className="mt-5 mb-2">
                                เลือกรูป
                            </h3>

                            <input type="file" id="selectImageFile" onChange={handleImageChange}
                                className="hidden" accept="image/*" />
                            <label htmlFor="selectImageFile" className="border rounded-md p-2 w-full bg-amber-40 hover:cursor-pointer
                                     hover:bg-blue-500 transition-colors duration-300">
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
                                className="border rounded-md p-2 w-full bg-amber-40">
                                <option value="1">เสร็จสิ้น</option>
                                <option value="0" selected>
                                    รอดำเนินการ
                                </option>
                            </select>

                            <button onClick={handleSaveData}
                                className="mt-5 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors duration-300">
                                บันทึกข้อมูลเพิ่มเติม
                            </button>


                            <button onClick={handleResetData}
                                className="mt-5 bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors duration-300">
                                รีเซ็ตข้อมูล
                            </button>

                        </div>

                        <div>
                            Link to <a href="/hometask" className="text-blue-500 hover:underline">Home Task</a>
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