'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import EditEmployeeForm from './EditEmployeeForm'

interface Employee {
  id: string
  name: string
  email: string
  position: string
}

export default function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)

  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    const response = await fetch('/api/employees')
    const data = await response.json()
    setEmployees(data)
  }

  const handleDelete = async (id: string) => {
    await fetch(`/api/employees/${id}`, { method: 'DELETE' })
    fetchEmployees()
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {employees.map((employee) => (
        <Card key={employee.id}>
          <CardHeader>
            <CardTitle>{employee.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Position:</strong> {employee.position}</p>
            <div className="mt-4 space-x-2">
              <Button onClick={() => setEditingEmployee(employee)}>Edit</Button>
              <Button variant="destructive" onClick={() => handleDelete(employee.id)}>Delete</Button>
            </div>
          </CardContent>
        </Card>
      ))}
      {editingEmployee && (
        <EditEmployeeForm 
          employee={editingEmployee} 
          onClose={() => setEditingEmployee(null)} 
          onUpdate={fetchEmployees} 
        />
      )}
    </div>
  )
}

