'use client'

import { useEffect, useState } from 'react'
import { Header } from "@/app/components/Header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, UserPlus, UserMinus, DollarSign } from 'lucide-react'

interface Employee {
    id: string
    name: string
    email: string
    position: "ALUMNI" | "SISWA" | "MAHASISWA" | undefined
    jurusan: string
    angkatan: number
}
export default function Dashboard() {
    const [employees, setEmployees] = useState<Employee[]>([])
    useEffect(() => {
        fetchEmployees()
    }, [])

    const fetchEmployees = async () => {
        const response = await fetch('/api/employees')
        const data = await response.json()
        setEmployees(data)
    }

    return (
        <div className="flex-1 overflow-y-auto">
            <Header />
            <main className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1,234</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Alumni</CardTitle>
                            <UserPlus className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">45</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Mahasiswa</CardTitle>
                            <UserPlus className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">45</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Siswa</CardTitle>
                            <UserPlus className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">45</div>
                        </CardContent>
                    </Card>


                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Alumni Terkini</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nama</TableHead>
                                    <TableHead className='hidden md:table-cell'>Komponen</TableHead>
                                    <TableHead className='hidden md:table-cell'>Jurusan</TableHead>
                                    <TableHead className='hidden md:table-cell'>Angkatan</TableHead>

                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {employees.map((employee) => (
                                    <TableRow key={employee.id}>
                                        <TableCell>{employee.name}</TableCell>
                                        <TableCell className='hidden md:table-cell'>{employee.position}</TableCell>
                                        <TableCell className='hidden md:table-cell'>{employee.jurusan}</TableCell>
                                        <TableCell className='hidden md:table-cell'>{employee.angkatan}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}

