import { NextResponse } from 'next/server'
import { Pelayanan, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const employee = await prisma.employee.findUnique({
    where: { id: params.id },
  })
  if (!employee) {
    return NextResponse.json({ error: 'Employee not found' }, { status: 404 })
  }
  return NextResponse.json(employee)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  const employee = await prisma.employee.update({
    where: { id: params.id },
    data: {
      name: body.name,
      email: body.email,
      position: body.position ? body.position.toUpperCase() : undefined,
      image: body.image,
      kampus: body.kampus,
      otherKampus: body.kampus === 'OTHER' ? body.otherKampus : undefined,
      jurusan: body.jurusan,
      angkatan: body.angkatan as number,
      birthDay: body.birthDay,
      pelayanan : body.pelayanan,
      otherPelayanan: body.pelayanan === 'OTHER' ? body.otherPelayanan : undefined,
    },
  })
  return NextResponse.json(employee)
}


export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await prisma.employee.delete({
    where: { id: params.id },
  })
  return NextResponse.json({ message: 'Employee deleted' })
}

