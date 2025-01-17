"use client";
import Link from 'next/link'
import { Home, Settings, User } from 'lucide-react'
import { usePathname } from 'next/navigation'


const MobileNavbar = () => {
    const pathname = usePathname();


    return (
        <div className='md:hidden flex flex-row p-4'>
            <Link href="/"
                className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white  text-black
                ${pathname === "/" ? "bg-black text-white" : "bg-red"}`
                }>
                <Home className="inline-block mr-2" size={20} />
                <span className='hidden sm:block'>
                    Dashboard
                </span>
            </Link>
            <Link href="/alumni"
                className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white  text-black
                    ${pathname === "/alumni" ? "bg-black text-white" : "bg-red"}`
                    }>
                <User className="inline-block mr-2" size={20} />
                <span className='hidden sm:block'>
                    Management Data
                </span>
            </Link>
            <Link href="/settings" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white bg-red text-black">
                <Settings className="inline-block mr-2" size={20} />
                <span className='hidden sm:block'>
                    Pengaturan
                </span>
            </Link>
        </div>
    )
}

export default MobileNavbar
