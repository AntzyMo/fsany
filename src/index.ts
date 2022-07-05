import { chdir } from 'process'
import { promises as fs } from 'fs'
import { isAbsolute, resolve } from 'path'
import { pathExists, outputFile } from 'fs-extra'

export const getexport = () => {
  return fs
}

export const initialPath = (path:string[] | string) => {
  const cwd = process.cwd()
  const handlePath = typeof path === 'string' ? [path] : path
  // 判断是否是绝对路径
  const isAbsolutePath = isAbsolute(handlePath[0])
  const newPath = isAbsolutePath ? [...handlePath] : [cwd, ...handlePath]
  return resolve(...newPath)
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
  return await fs.readFile(path, { encoding: 'utf-8' })
  // try {
  //   if (isFile) {
  //     return await fs.readFile(path, { encoding: 'utf-8' })
  //   }
  // } catch (err) {
  //   Promise.reject(err)
  // }
}

// 进入目录
export const cd = async (path:string) => {
  try {
    await chdir(path)
  } catch (err) {
    Promise.reject(err)
  }
}
