'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileInput } from 'lucide-react'


interface Employee {
  id: string
  name: string
  email: string
  position?: 'ALUMNI' | 'SISWA' | 'MAHASISWA'
  image?: string
  kampus?: 'UPR' | 'MUHAMMADIYAH' | 'UNKRIP' | 'OTHER'
  otherKampus?: string
  jurusan?: string
  angkatan?: number
  birthDay?: string
  pelayanan?: 'BPP' | 'SISWA' | 'MAHASISWA' | 'ALUMNI' | 'OTHER'
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
  const [angkatan, setAngkatan] = useState(2000)
  const [birthDay, setbirthDay] = useState('')
  const [pelayanan, setPelayanan] = useState<'BPP' | 'SISWA' | 'MAHASISWA' | 'ALUMNI' | 'OTHER' | ''>('')
  const [otherPelayanan, setOtherPelayanan] = useState('')

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
        jurusan: jurusan || undefined,
        angkatan,
        birthDay,
        pelayanan: pelayanan || undefined,
        otherPelayanan: pelayanan === 'OTHER' ? otherPelayanan : undefined,  // Optional field for additional data to// Optional field for additional data to
        
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
      setAngkatan(2000)
      setbirthDay('')  
      setPelayanan('')
      setOtherPelayanan('')
      // Reset birth date to current date when new employee is added to avoid errors in form validation
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
            <SelectValue placeholder="Pilih Komponen" />
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
            <SelectValue placeholder="Piih kampus" />
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
        <Label htmlFor="pelayanan">Pelayanan</Label>
        <Select value={pelayanan} onValueChange={(value: 'BPP' | 'SISWA' | 'MAHASISWA' | 'ALUMNI' | 'OTHER' | '') => setPelayanan(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Piih Jenis Pelayanan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Tidak ada</SelectItem>
            <SelectItem value="SISWA">SISWA</SelectItem>
            <SelectItem value="MAHASISWA">MAHASISWA</SelectItem>
            <SelectItem value="ALUMNI">ALUMNI</SelectItem>
            <SelectItem value="BPP">BPP</SelectItem>
            <SelectItem value="OTHER">Lainnya</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {pelayanan === 'OTHER' && (
        <div>
          <Label htmlFor="otherPelayanan">Pelayanan Lain</Label>
          <Input id="otherPelayanan" value={otherPelayanan} onChange={(e) => setOtherPelayanan(e.target.value)} required />
        </div>
      )}
      
      <div>
        <Label htmlFor="jurusan">Jurusan</Label>
        <Input id="jurusan" value={jurusan} onChange={(e) => setJurusan(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="angkatan">Angkatan</Label>
        <Input id="angkatan" type="number" value={angkatan} onChange={(e) => setAngkatan(e.target.valueAsNumber)} required />
      </div>
      <div>
        <Label htmlFor="birthDay">Tanggal Lahir</Label>
        <Input id="birthDay" type="date" value={birthDay} onChange={(e) => setbirthDay(e.target.value)} required />
      </div>
      <Button type="submit"><FileInput size={20} />Tambah Data</Button>
    </form>
  )
}

