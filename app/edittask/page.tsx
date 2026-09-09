'use client'

import Image from 'next/image'
import AppName from '@/components/AppName'
import Footer from '@/components/footer'
import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import Swal from 'sweetalert2'

const STORAGE_BUCKET = 'task_bk'

function EditTaskPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const taskId = searchParams.get('id')
    const [taskTitle, setTaskTitle] = useState('')
    const [detail, setDetail] = useState('')
    const [isCompleted, setIsCompleted] = useState(false)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState('')

    useEffect(() => {
        const fetchTask = async () => {
            if (!taskId) return

            const { data, error } = await supabase.from('task_tb').select('*').eq('id', taskId).single()
            if (error) {
                Swal.fire('เกิดข้อผิดพลาด', `ไม่สามารถโหลดข้อมูลงานได้: ${error.message}`, 'error')
                return
            }

            setTaskTitle(data.title)
            setDetail(data.detail)
            setIsCompleted(data.is_completed)
            setImagePreview(data.image_url)
        }

        fetchTask()
    }, [taskId])

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setImageFile(file)
            setImagePreview(URL.createObjectURL(file))
        }
    }

    const handleUpdateTask = async () => {
        if (!taskId || !taskTitle || !detail) {
            Swal.fire('คำเตือน!', 'กรุณากรอกข้อมูลให้ครบถ้วน', 'warning')
            return
        }

        let imageUrl = imagePreview
        if (imageFile) {
            const safeFileName = imageFile.name.replace(/[^a-zA-Z0-9._-]/g, '_')
            const newFileName = `dtisaujija_${Date.now()}_${safeFileName}`
            const { error: uploadError } = await supabase.storage.from(STORAGE_BUCKET).upload(newFileName, imageFile)
            if (uploadError) {
                Swal.fire('เกิดข้อผิดพลาด', `ไม่สามารถอัพโหลดรูปภาพได้: ${uploadError.message}`, 'error')
                return
            }
            imageUrl = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(newFileName).data.publicUrl
        }

        const { error } = await supabase.from('task_tb').update({
            title: taskTitle,
            detail,
            is_completed: isCompleted,
            image_url: imageUrl,
            update_at: new Date().toISOString(),
        }).eq('id', taskId)

        if (error) {
            Swal.fire('เกิดข้อผิดพลาด', `ไม่สามารถแก้ไขข้อมูลงานได้: ${error.message}`, 'error')
            return
        }

        await Swal.fire('สำเร็จ', 'แก้ไขข้อมูลงานเรียบร้อยแล้ว', 'success')
        router.push('/hometask')
    }

    const handleResetData = () => {
        setTaskTitle('')
        setDetail('')
        setIsCompleted(false)
        setImageFile(null)
        setImagePreview('')
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
                                onChange={(event) => setTaskTitle(event.target.value)}
                                type="text"
                                placeholder="หัวข้องาน"
                                className="w-full rounded-md border border-gray-300 bg-amber-50 p-2"
                            />

                            <h3 className="mt-5 mb-2">
                                ป้อนรายละเอียดงาน
                            </h3>

                            <textarea value={detail} onChange={(event) => setDetail(event.target.value)} rows={5} className="w-full resize-y rounded-md border border-gray-300 bg-amber-50 p-2" placeholder="รายละเอียดงาน"></textarea>

                            <h3 className="mt-5 mb-2">
                                เลือกรูป
                            </h3>

                            <input type="file" id="selectImageFile" onChange={handleImageChange} className="hidden" accept="image/*" />
                            <label htmlFor="selectImageFile" className="block w-full rounded-md border border-gray-300 bg-amber-50 p-2 text-center transition-colors duration-300 hover:cursor-pointer hover:bg-blue-500 hover:text-white">
                                เลือกรูป
                            </label>

                            {imagePreview && <Image src={imagePreview} alt="Preview" width={100} height={100} className="mt-3 h-24 w-24 rounded object-cover" />}

                            <h3 className="mt-5 mb-2">
                                สถานะงาน
                            </h3>
                            <select value={isCompleted ? '1' : '0'} onChange={(event) => setIsCompleted(event.target.value === '1')} className="w-full rounded-md border border-gray-300 bg-amber-50 p-2">
                                <option value="1">เสร็จสิ้น</option>
                                <option value="0">
                                    รอดำเนินการ
                                </option>
                            </select>

                            <button onClick={handleUpdateTask} className="mt-5 rounded-md bg-blue-500 px-4 py-2 text-white transition-colors duration-300 hover:bg-blue-600">
                                บันทึกแก้ไขเพิ่มเติม
                            </button>

                            
                            <button onClick={handleResetData} className="mt-5 rounded-md bg-red-500 px-4 py-2 text-white transition-colors duration-300 hover:bg-red-600">
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

export default function Page() {
    return (
        <Suspense fallback={<div className="p-8 text-center">กำลังโหลดข้อมูล...</div>}>
            <EditTaskPage />
        </Suspense>
    )
}