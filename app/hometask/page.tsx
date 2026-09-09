"use client"

import Image from 'next/image'
import AppName from '@/components/AppName'
import Footer from '@/components/footer'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Swal from 'sweetalert2'


type Task = {
    id: string;
    created_at: string;
    title: string;
    detail: string;
    is_completed: boolean;
    image_url: string;
    update_at: string;
};


export default function Page() {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const fetchTasks = async () => {

            const { data, error } = await supabase.from('task_tb').select('*')

            if (error) {
                Swal.fire({
                    title: 'เกิดข้อผิดพลาด',
                    text: `ไม่สามารถโหลดข้อมูลงานได้: ${error.message}`,
                    icon: 'error',
                    confirmButtonText: 'ตกลง',
                })

                return
            }

            setTasks(data as Task[])
        }

        fetchTasks()
    }, [])



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

                        <div className="flex w-full justify-end sm:translate-x-32">
                            <Link
                                href="/addtask"
                                className="rounded-lg bg-blue-500 px-10 py-2 text-white transition-colors duration-300 hover:bg-blue-600"
                            >
                                เพิ่ม TASK
                            </Link>
                        </div>
                    </section>
                </main>

                <table className="w-full max-w-lg border-collapse border border-gray-300 text-center">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">รูปงาน</th>
                            <th className="border border-gray-300 px-4 py-2">ชื่องาน</th>
                            <th className="border border-gray-300 px-4 py-2">รายละเอียดงาน</th>
                            <th className="border border-gray-300 px-4 py-2">สถานะ</th>
                            <th className="border border-gray-300 px-4 py-2">ลบ/แก้ไข</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            tasks.map((task) => (

                                <tr key={task.id}>
                                    <td className="border border-gray-300 px-4 py-2"></td>
                                    <td className="border border-gray-300 px-4 py-2">{task.title}</td>
                                    <td className="border border-gray-300 px-4 py-2">{task.detail}</td>
                                    <td className="border border-gray-300 px-4 py-2">{task.is_completed ? 'เสร็จสิ้น' : 'กำลังดำเนินการ'}</td>
                                    <td className="border border-gray-300 px-4 py-2">ลบ/แก้ไข</td>
                                </tr>
                            ))
                        }
                    </tbody>

                </table>


                <footer className="mt-auto w-full max-w-lg px-4 pb-8">
                    <Footer />
                </footer>
            </div>
        </div>
    )
}
