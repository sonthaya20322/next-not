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
                            src="https://bvumrcykwytgsmgylbun.supabase.co/storage/v1/object/public/task-tb/tasl_logo.png"
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
                                type="text"
                                placeholder="หัวข้องาน"
                                className="w-full p-2 border border-gray-300 rounded bg-amber-40"
                            />

                            <h3 className="mt-5 mb-2">
                                ป้อนรายละเอียดงาน
                            </h3>

                            <textarea rows={5} className="w-full border rouded-mb p-2 bg-amber-40" placeholder="รายละเอียดงาน"></textarea>

                            <h3 className="mt-5 mb-2">
                                เลือกรูป
                            </h3>

                            <input type="file" id="selectImageFile" className="hidden" />
                            <label htmlFor="selectImageFile" className="border rounded-md p-2 w-full bg-amber-40 hover:cursor-pointer
                                     hover:bg-blue-500 transition-colors duration-300">
                                เลือกรูป
                            </label>

                            <h3 className="mt-5 mb-2">
                                สถานะงาน
                            </h3>
                            <select className="border rounded-md p-2 w-full bg-amber-40">
                                <option value="1">เสร็จสิ้น</option>
                                <option value="0" selected>
                                    รอดำเนินการ
                                </option>
                            </select>

                            <button className="mt-5 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors duration-300">
                                บันทึกแก้ไขเพิ่มเติม
                            </button>

                            
                            <button className="mt-5 bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors duration-300">
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