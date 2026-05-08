import { prisma } from './prisma'

export const connectDB = async (): Promise<void> => {
  try {
    // Test the connection by running a simple query
    await prisma.$queryRaw`SELECT 1`
    console.log('MySQL database connected successfully')
  } catch (error) {
    console.error('Failed to connect to MySQL database:', error)
    throw error
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  await prisma.$disconnect()
})

