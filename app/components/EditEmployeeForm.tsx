'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, X} from 'lucide-react'


interface Employee {
  id: string
  name: string
  email: string
  position?: 'ALUMNI' | 'SISWA' | 'MAHASISWA'
  image?: string
  kampus?: 'UPR' | 'MUHAMMADIYAH' | 'UNKRIP' | 'OTHER'
  otherKampus?: string
  jurusan?: string
  angkatan?: number | 0
  birthDay?: string
  pelayanan?: 'BPP' | 'SISWA' | 'MAHASISWA' | 'ALUMNI' | 'OTHER'
  otherPelayanan?: string

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
  const [angkatan, setAngkatan] = useState(employee.angkatan || 0)
  const [birthDay, setBirthDay] = useState(employee.birthDay || '')
  const [pelayanan, setPelayanan] = useState<'BPP' | 'SISWA' | 'MAHASISWA' | 'ALUMNI' | 'OTHER' | ''>(employee.pelayanan || '')
  const [otherPelayanan, setOtherPelayanan] = useState(employee.otherPelayanan || '')

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
        jurusan: jurusan || undefined,
        angkatan,
        birthDay,
        pelayanan: pelayanan || undefined,
        otherPelayanan: pelayanan === 'OTHER'? otherPelayanan : undefined,
      }),
    })
    if (response.ok) {
      const updatedEmployee = await response.json()
      onUpdate(updatedEmployee)
      onClose()
    } else {
      console.error('Failed to update Data')
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className='overflow-y-scroll'>
        <DialogHeader>
          <DialogTitle>Edit Data</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="edit-name">Nama Lengkap</Label>
            <Input id="edit-name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="edit-email">Email</Label>
            <Input id="edit-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="edit-position">Komponen</Label>
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
          <div>
            <Label htmlFor="angkatan">Angkatan</Label>
            <Input id="angkatan" type="number" value={angkatan} onChange={(e) => setAngkatan(e.target.valueAsNumber)} required />
          </div>
          <div>

          <div>
            <Label htmlFor="edit-pelayanan">Pelayanan</Label>
            <Select value={pelayanan} onValueChange={(value: 'SISWA' | 'MAHASISWA' | 'ALUMNI' | 'BPP' |'OTHER' |'') => setPelayanan(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Pelayanan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="SISWA">SISWA</SelectItem>
                <SelectItem value="MAHASISWA">MAHASISWA</SelectItem>
                <SelectItem value="ALUMNI">ALUMNI</SelectItem>                
                <SelectItem value="BPP">BPP</SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {pelayanan === 'OTHER' && (
            <div>
              <Label htmlFor="edit-otherPelayanan">Pelayanan Lain</Label>
              <Input id="edit-otherPelayanan" value={otherPelayanan} onChange={(e) => setOtherPelayanan(e.target.value)} required />
            </div>
          )}

            <Label htmlFor="birthDay">Tanggal Lahir</Label>
            <Input id="birthDay" type="date" value={birthDay} onChange={(e) => setBirthDay(e.target.value)} required />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}><X size={20}/>Cancel</Button>
            <Button type="submit"><Save size={20}/>Simpan Perubahan</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

