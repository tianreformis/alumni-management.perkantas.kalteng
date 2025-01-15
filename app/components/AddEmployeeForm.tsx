'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

interface AddEmployeeFormProps {
  onAddEmployee: (employee: Employee) => void
}

export default function AddEmployeeForm({ onAddEmployee }: AddEmployeeFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [position, setPosition] = useState<'ALUMNI' | 'SISWA' | 'MAHASISWA' | ''>('')
  const [image, setImage] = useState('')
  const [kampus, setKampus] = useState<'UPR' | 'MUHAMMADIYAH' | 'UNKRIP' | 'OTHER' | ''>('')
  const [otherKampus, setOtherKampus] = useState('')
  const [jurusan, setJurusan] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/employees', {
      method: 'POST',
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
      const newEmployee = await response.json()
      onAddEmployee(newEmployee)
      setName('')
      setEmail('')
      setPosition('')
      setImage('')
      setKampus('')
      setOtherKampus('')
      setJurusan('')
      window.location.reload() 
    } else {
      console.error('Failed to add employee')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <div>
        <Label htmlFor="name">Nama Lengkap</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="position">Komponen</Label>
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
        <Label htmlFor="image">Image URL</Label>
        <Input id="image" value={image} onChange={(e) => setImage(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="kampus">Kampus</Label>
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
          <Label htmlFor="otherKampus">Other Kampus</Label>
          <Input id="otherKampus" value={otherKampus} onChange={(e) => setOtherKampus(e.target.value)} required />
        </div>
      )}
      <div>
        <Label htmlFor="jurusan">Jurusan</Label>
        <Input id="jurusan" value={jurusan} onChange={(e) => setJurusan(e.target.value)} />
      </div>
      <Button type="submit">Tambah Data</Button>
    </form>
  )
}

