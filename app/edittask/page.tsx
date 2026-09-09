import Image from 'next/image'
import AppName from '@/components/AppName'
import Footer from '@/components/footer'

export default function Page() {
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
                                type="text"
                                placeholder="หัวข้องาน"
                                className="w-full rounded-md border border-gray-300 bg-amber-50 p-2"
                            />

                            <h3 className="mt-5 mb-2">
                                ป้อนรายละเอียดงาน
                            </h3>

                            <textarea rows={5} className="w-full resize-y rounded-md border border-gray-300 bg-amber-50 p-2" placeholder="รายละเอียดงาน"></textarea>

                            <h3 className="mt-5 mb-2">
                                เลือกรูป
                            </h3>

                            <input type="file" id="selectImageFile" className="hidden" />
                            <label htmlFor="selectImageFile" className="block w-full rounded-md border border-gray-300 bg-amber-50 p-2 text-center transition-colors duration-300 hover:cursor-pointer hover:bg-blue-500 hover:text-white">
                                เลือกรูป
                            </label>

                            <h3 className="mt-5 mb-2">
                                สถานะงาน
                            </h3>
                            <select className="w-full rounded-md border border-gray-300 bg-amber-50 p-2">
                                <option value="1">เสร็จสิ้น</option>
                                <option value="0">
                                    รอดำเนินการ
                                </option>
                            </select>

                            <button className="mt-5 rounded-md bg-blue-500 px-4 py-2 text-white transition-colors duration-300 hover:bg-blue-600">
                                บันทึกแก้ไขเพิ่มเติม
                            </button>

                            
                            <button className="mt-5 rounded-md bg-red-500 px-4 py-2 text-white transition-colors duration-300 hover:bg-red-600">
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