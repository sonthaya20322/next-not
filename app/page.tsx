import Image from 'next/image'
import AppName from '@/components/AppName'

export default function page() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {/* ชื่อแสดงหน้าแอป */}
      <div className="text-center mt-30">
        <AppName />
      </div>

      {/* image */}
      <Image
        src="https://bvumrcykwytgsmgylbun.supabase.co/storage/v1/object/public/task-tb/tasl_logo.png"
        alt="Task App"
        width={150}
        height={100}
        className="mt-10"
      />
      {/* การป้อน input */}
      <div className="mt-10 flex w-full max-w-md gap-3 px-4">
        <input
          type="text"
          placeholder="Enter Secure code"
          className="h-11 min-w-0 flex-1 rounded border border-gray-300 px-3 focus:border-blue-500 focus:outline-none"
        />
        <button className="h-11 shrink-0 rounded bg-blue-500 px-5 text-white transition-colors hover:bg-blue-600">
          Wellcome
        </button>
      </div>
    </div>
  )
}
