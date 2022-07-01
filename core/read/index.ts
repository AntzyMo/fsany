import { readFile } from 'fs/promises'
import { resolve } from 'path'
const fs = require('fs-extra')

const cwd = process.cwd()
export const initialPath = (path: string) => resolve(cwd, path)

export const read = async (path: string) => {
  path = initialPath(path)
  try {
    const res = await readFile(path, { encoding: 'utf-8' })
    console.log(1111, 'res')
    return res
  } catch (err) {
    console.log(err, 'err')
    Promise.reject(err)
  }
}

console.log(initialPath('../fsany/type.ts'))
