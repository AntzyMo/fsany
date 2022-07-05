import { chdir } from 'process'
import { promises as fs } from 'fs'
import { resolve } from 'path'
import { outputFile } from 'fs-extra'

export const getexport = () => {
  return fs
}

export const initialPath = (path:string[] | string) => {
  const handlePath = typeof path === 'string' ? [path] : path
  return resolve(...handlePath)
}

// write file
export const writeFile = async (file:string[]| string, data:string) => {
  const path = initialPath(file)
  await outputFile(path, data)
}

// read file or Dir
export const read = async (file:string[]| string) => {
  const path = initialPath(file)
  const isFile = path.includes('.')
  if (isFile) {
    return await fs.readFile(path, { encoding: 'utf-8' })
  } else {
    return await fs.readdir(path, { encoding: 'utf-8' })
  }
}

// 进入目录
export const cd = async (path:string) => {
  try {
    await chdir(path)
    return true
  } catch (err) {
    return Promise.reject(err)
  }
}
