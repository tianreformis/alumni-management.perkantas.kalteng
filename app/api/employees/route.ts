import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const employees = await prisma.employee.findMany()
  return NextResponse.json(employees)
}

export async function POST(request: Request) {
  const body = await request.json()
  const employee = await prisma.employee.create({
    data: {
      name: body.name,
      email: body.email,
      position: body.position ? body.position.toUpperCase() : undefined,
      image: body.image,
      kampus: body.kampus,
      otherKampus: body.kampus === 'OTHER' ? body.otherKampus : undefined,
      jurusan: body.jurusan,
      angkatan: body.angkatan,
      birthDay : body.birthDay
    },
  })
  return NextResponse.json(employee)
}

