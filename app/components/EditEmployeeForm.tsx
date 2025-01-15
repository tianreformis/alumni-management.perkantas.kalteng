'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Employee {
  id: string
  name: string
  email: string
  position?: 'ALUMNI' | 'SISWA' | 'MAHASISWA'
  image?: string
  kampus?: 'UPR' | 'MUHAMMADIYAH' | 'UNKRIP' | 'OTHER'
  otherKampus?: string
  jurusan?: string
}

interface EditEmployeeFormProps {
  employee: Employee
  onClose: () => void
  onUpdate: (employee: Employee) => void
}

export default function EditEmployeeForm({ employee, onClose, onUpdate }: EditEmployeeFormProps) {
  const [name, setName] = useState(employee.name)
  const [email, setEmail] = useState(employee.email)
  const [position, setPosition] = useState<'ALUMNI' | 'SISWA' | 'MAHASISWA' | ''>(employee.position || '')
  const [image, setImage] = useState(employee.image || '')
  const [kampus, setKampus] = useState<'UPR' | 'MUHAMMADIYAH' | 'UNKRIP' | 'OTHER' | ''>(employee.kampus || '')
  const [otherKampus, setOtherKampus] = useState(employee.otherKampus || '')
  const [jurusan, setJurusan] = useState(employee.jurusan || '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch(`/api/employees/${employee.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        name, 
        email, 
        position: position || undefined,
        image: image || undefined,
        kampus: kampus || undefined,
        otherKampus: kampus === 'OTHER' ? otherKampus : undefined,
        jurusan: jurusan || undefined
      }),
    })
    if (response.ok) {
      const updatedEmployee = await response.json()
      onUpdate(updatedEmployee)
      onClose()
    } else {
      console.error('Failed to update employee')
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Employee</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="edit-name">Name</Label>
            <Input id="edit-name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="edit-email">Email</Label>
            <Input id="edit-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="edit-position">Position</Label>
            <Select value={position} onValueChange={(value: 'ALUMNI' | 'SISWA' | 'MAHASISWA' | '') => setPosition(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="ALUMNI">Alumni</SelectItem>
                <SelectItem value="SISWA">Siswa</SelectItem>
                <SelectItem value="MAHASISWA">Mahasiswa</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="edit-image">Image URL</Label>
            <Input id="edit-image" value={image} onChange={(e) => setImage(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="edit-kampus">Kampus</Label>
            <Select value={kampus} onValueChange={(value: 'UPR' | 'MUHAMMADIYAH' | 'UNKRIP' | 'OTHER' | '') => setKampus(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a kampus" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="UPR">UPR</SelectItem>
                <SelectItem value="MUHAMMADIYAH">MUHAMMADIYAH</SelectItem>
                <SelectItem value="UNKRIP">UNKRIP</SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {kampus === 'OTHER' && (
            <div>
              <Label htmlFor="edit-otherKampus">Other Kampus</Label>
              <Input id="edit-otherKampus" value={otherKampus} onChange={(e) => setOtherKampus(e.target.value)} required />
            </div>
          )}
          <div>
            <Label htmlFor="edit-jurusan">Jurusan</Label>
            <Input id="edit-jurusan" value={jurusan} onChange={(e) => setJurusan(e.target.value)} />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

