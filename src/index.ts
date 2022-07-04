import { chdir } from 'process'
import { promises as fs } from 'fs'
import { isAbsolute } from 'path'
import { fileURLToPath, URL } from 'url'
export const getexport = () => {
  return fs
}

const initialPath = (path:string) => {
  console.log(path, 'ww')
  if (isAbsolute(path)) {
    return path
  } else {
    console.log(new URL(path, import.meta.url), 'sss')
    return fileURLToPath(new URL(path, import.meta.url))
  }
}

// read file
export const read = async (arg:string) => {
  const path = initialPath(arg)
  return await fs.readFile(path, { encoding: 'utf-8' })
}

// write file
export const write = async (file:string, data:string) => {
  const path = initialPath(file)
  console.log(path, 'path')
  await fs.writeFile(path, data, { encoding: 'utf-8' })
}

// 进入目录
export const cd = async (path:string) => {
  try {
    await chdir(path)
  } catch (err) {
    Promise.reject(err)
  }
}
