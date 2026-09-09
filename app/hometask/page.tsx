import Image from 'next/image'
import AppName from '@/components/AppName'
import Footer from '@/components/footer'
import Link from 'next/link'


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

                        <div className="flex w-full justify-end">
                            <Link
                                href="/addtask"
                                className="rounded-lg bg-blue-500 px-10 py-2 text-white transition-colors duration-300 hover:bg-blue-600"
                            >
                                เพิ่ม TASK
                            </Link>
                        </div>
                    </section>
                </main>

                <footer className="mt-auto w-full max-w-lg px-4 pb-8">
                    <Footer />
                </footer>
            </div>
        </div>
    )
}