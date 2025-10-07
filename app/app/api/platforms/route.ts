
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const platforms = await prisma.platform.findMany({
      where: { isActive: true },
      orderBy: { displayName: 'asc' },
    });

    return NextResponse.json(platforms);
  } catch (error) {
    console.error('Error fetching platforms:', error);
    return NextResponse.json(
      { error: 'Failed to fetch platforms' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
