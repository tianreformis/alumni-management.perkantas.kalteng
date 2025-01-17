'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import EditEmployeeForm from './EditEmployeeForm'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast } from 'react-toastify';

import Modal from 'react-modal';
import { DeleteIcon, Edit, Edit2Icon, LucidePrinter, PrinterIcon, FileText, ArrowBigRight, ArrowBigLeft, FileCode } from 'lucide-react'
import * as XLSX from 'xlsx';

// Add this at the top of your file
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};


interface Employee {
  id: string
  name: string
  email: string
  position: "ALUMNI" | "SISWA" | "MAHASISWA" | undefined
  jurusan: string
  angkatan: number
  birthDay: string
}

export default function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;


  const handleOpenDeleteModal = (employee: Employee) => {
    setEmployeeToDelete(employee);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setEmployeeToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (employeeToDelete) {
      await fetch(`/api/employees/${employeeToDelete.id}`, { method: 'DELETE' });
      fetchEmployees();
      toast.success('Employee deleted successfully');
      handleCloseDeleteModal();
    }
  };

  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    const response = await fetch(`/api/employees`)
    const data = await response.json()
    setEmployees(data)
  }

  const dateToday = new Date().toISOString().split('T')[0];
  const timeNow = new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();

  const handleDelete = async (id: string) => {
    const confirmation = window.confirm(`Are you sure you want to delete employee with ID ${id}?`);

    if (confirmation) {
      await fetch(`/api/employees/${id}`, { method: 'DELETE' })
      fetchEmployees()
      toast.success('Employee deleted successfully');
    } else {
      toast.error('Deletion cancelled');
    }
  }

  const handlePrint = async (id: string) => {
    const response = await fetch(`/api/employees/${id}`)
    const data = await response.json()

    const printWindow = window.open('', '', 'height=500,width=800');
    if (printWindow) {
      printWindow.document.write(`
      <html>
        <head>
          <title>Alumni Perkantas Kalteng</title>
        </head>
        <body>
          <h1>Alumni Data</h1>
          <p>Nama: ${data.name}</p>
          <p>Email: ${data.email}</p>
          <p>Komponen: ${data.position}</p>
          <p>Jurusan: ${data.jurusan}</p>
          <p>Angkatan: ${data.Angkatan}</p>
        </body>
      </html>
    `);
      printWindow.document.close();
      printWindow.print();
      printWindow.close();
    } else {
      console.error('Unable to open print window');
    }
  }

  const handleExportCurrentToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(currentEmployees);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
    XLSX.writeFile(workbook, `alumniCurrent${dateToday}_${timeNow}.xlsx`);
    toast.success('Data Sekarang Berhasil di Export');
  };

  const handleExportAllToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(employees);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
    XLSX.writeFile(workbook, `alumniAll${dateToday}_${timeNow}.xlsx`);
    toast.success('Semua Data Berhasil di Export');
  };

  const totalPage = Math.ceil(employees.length / itemsPerPage);
  const currentEmployees = employees.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const handleNextPage = () => {
    if (currentPage < totalPage) setCurrentPage(currentPage + 1)
  }
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead className='hidden md:table-cell'>Email</TableHead>
            <TableHead className='hidden md:table-cell'>Komponen</TableHead>
            <TableHead className='hidden md:table-cell'>Jurusan</TableHead>
            <TableHead className='hidden md:table-cell'>Angkatan</TableHead>
            <TableHead className='hidden md:table-cell'>Tanggal Lahir</TableHead>
            <TableHead>Aksi</TableHead>

          </TableRow>
        </TableHeader>
        <TableBody>
          {currentEmployees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.name}</TableCell>
              <TableCell className='hidden md:table-cell'>{employee.email}</TableCell>
              <TableCell className='hidden md:table-cell'>{employee.position}</TableCell>
              <TableCell className='hidden md:table-cell'>{employee.jurusan}</TableCell>

              <TableCell className='hidden md:table-cell'>{employee.angkatan}</TableCell>
              <TableCell className='hidden md:table-cell'>{employee.birthDay}</TableCell>
              <TableCell className='md:flex md:gap-2 '>
                <Button onClick={() => setEditingEmployee(employee)}><Edit2Icon size={20} /></Button>
                <Button variant="outline" onClick={() => handlePrint(employee.id)}><PrinterIcon size={20} /></Button>
                <Button variant="destructive" onClick={() => handleOpenDeleteModal(employee)}><DeleteIcon size={20} /></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className='flex justify-between'>
        <Button onClick={handleExportCurrentToExcel}><FileText size={20} />
          <span className='hidden md:block'>
            Export data Sekarang
          </span>
        </Button>
        <Button onClick={handleExportAllToExcel}><FileCode size={20} />
          <span className='hidden md:block'>
            Export Semua Data
          </span>
        </Button>

      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <ArrowBigLeft />

        </button>
        <span className="text-sm text-gray-600">
          Halaman {currentPage} Dari {totalPage}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={handleNextPage}
          disabled={currentPage === totalPage}
        >
          <ArrowBigRight />
        </button>
      </div>
      {editingEmployee && (
        <EditEmployeeForm
          employee={editingEmployee}
          onClose={() => setEditingEmployee(null)}
          onUpdate={fetchEmployees}
        />
      )}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={handleCloseDeleteModal}
        style={customStyles}
        ariaHideApp={false}

      >
        <h2 className='text-lg font-bold my-2'>Konfirmasi Hapus</h2>
        <p className='my-2'>Apakah ingin menghapus data <b>{employeeToDelete?.name}?</b></p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleCloseDeleteModal}>Batal</Button>
          <Button variant="destructive" onClick={handleConfirmDelete}>Hapus</Button>
        </div>
      </Modal>

    </div>

  )
}

