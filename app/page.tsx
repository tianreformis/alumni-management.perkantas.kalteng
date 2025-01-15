'use client'

import { useState, useEffect } from 'react'
import EmployeeList from './components/EmployeeList'
import AddEmployeeForm from './components/AddEmployeeForm'

interface Employee {
  id: string
  name: string
  email: string
  position: string
}

export default function Home() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    try {
      const response = await fetch('/api/employees')
      const data = await response.json()
      setEmployees(data)
    } catch (error) {
      console.error('Failed to fetch employees:', error)
    } finally {
      setLoading(false)
    }
  }

  const addEmployee = (newEmployee: Employee) => {
    setEmployees([...employees, newEmployee])
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Alumni Management Perkantas Palangkaraya</h1>
      <AddEmployeeForm onAddEmployee={addEmployee} />
      {loading ? (
        <p>Loading Alumni...</p>
      ) : (
        <EmployeeList employees={employees} setEmployees={setEmployees} />
      )}
    </div>
  )
}

