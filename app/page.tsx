'use client'

import Image from 'next/image'
import { useState } from 'react'
import AppName from '@/components/AppName'
import Footer from '@/components/footer'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'

export default function Page() {
  const [secureCode, setSecureCode] = useState('')
  // สร้างตัวแปร router เพื่อใช้ในการนำทางไปยังหน้าอื่น
  const router = useRouter()

  const handleAccessTask = () => {
    if (secureCode === "") {
      Swal.fire({
        title: "คำเตือน!",
        icon: "warning",
        text: "กรุณากรอกรหัสความปลอดภัยให้ถูกต้อง",
      });

      return;

    }

    if (secureCode.toLocaleLowerCase() === 'dtisau') {
      // push เปิดแล้วย้อนกลับได้
      // replace ไม่สามารถย้อนกลับได้
      router.push('/hometask') // นำทางไปยังหน้า /hometask

      Swal.fire({
        title: "ยินดีต้อนรับ!",
        icon: "success",
        text: "คุณได้เข้าสู่ระบบแล้ว",
      });


    } else {
      Swal.fire({
        title: "คำเตือน!",
        icon: "warning",
        text: "รหัสความปลอดภัยไม่ถูกต้อง",
      });
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <header className="w-full max-w-lg px-4 pt-8 text-center">
        <AppName />
      </header>

      <main className="flex w-full max-w-lg flex-1 flex-col items-center justify-center px-4 py-10">
        <section className="flex w-full flex-col items-center">
          <Image
            src="https://bvumrcykwytgsmgylbun.supabase.co/storage/v1/object/public/task_bk/tasl_logo.png"
            alt="Task App"
            width={150}
            height={100}
            className="mb-8"
          />

          <div className="flex w-full max-w-md gap-3">
            <input
              type="text"
              value={secureCode}
              onChange={(event) => setSecureCode(event.target.value)}
              placeholder="Enter Secure code"
              className="h-11 min-w-0 flex-1 rounded border border-gray-300 px-3 focus:border-blue-500 focus:outline-none"
            />
            <button
              onClick={handleAccessTask}
              className="h-11 shrink-0 rounded bg-blue-500 px-5 text-white transition-colors hover:bg-blue-600"
            >
              Welcome
            </button>
          </div>
        </section>
      </main>

      <footer className="w-full max-w-lg px-4 pb-8">
        <Footer />
      </footer>
    </div>
  )
}
