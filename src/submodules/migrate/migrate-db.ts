import * as mysql from 'mysql2/promise'
import * as fs from 'fs'
import * as path from 'path'

const migrateDatabase = async () => {
  // Configura la conexión a tu base de datos MySQL
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    // database: process.env.DB_NAME,
  })
  const sqlFilePath = path.join(__dirname, 'bizmate.sql')
  const sqlFileContent = fs.readFileSync(sqlFilePath, 'utf-8')

  try {
    // Lee el contenido del archivo SQL
    await connection.query(sqlFileContent)

    // Ejecuta las sentencias SQL en la base de datos

    console.log('Migración exitosa.')
  } catch (error) {
    console.error('Error en la migración:', error)
  } finally {
    // Cierra la conexión a la base de datos
    await connection.end()
  }
}

export const main = migrateDatabase
