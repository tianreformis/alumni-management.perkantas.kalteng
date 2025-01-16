'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  jurusan : string
}

export default function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);

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
    const response = await fetch('/api/employees')
    const data = await response.json()
    setEmployees(data)
  }

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
          <title>Employee Data</title>
        </head>
        <body>
          <h1>Employee Data</h1>
          <p>Name: ${data.name}</p>
          <p>Email: ${data.email}</p>
          <p>Position: ${data.position}</p>
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

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead className='hidden md:table-cell'>Email</TableHead>
            <TableHead className='hidden md:table-cell'>Komponen</TableHead>
            <TableHead className='hidden md:table-cell'>Jurusan</TableHead>
            <TableHead>Aksi</TableHead>            
            
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.name}</TableCell>
              <TableCell className='hidden md:table-cell'>{employee.email}</TableCell>
              <TableCell className='hidden md:table-cell'>{employee.position}</TableCell>
              <TableCell className='hidden md:table-cell'>{employee.jurusan}</TableCell>
              <TableCell className='md:flex md:gap-2 '>
                <Button onClick={() => setEditingEmployee(employee)}>Edit</Button>
                <Button variant="outline" onClick={() => handlePrint(employee.id)}>Print</Button>
                <Button variant="destructive" onClick={() => handleOpenDeleteModal(employee)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
          <Button variant="outline" onClick={handleCloseDeleteModal}>Cancel</Button>
          <Button variant="destructive" onClick={handleConfirmDelete}>Delete</Button>
        </div>
      </Modal>
    </div>

  )
}

