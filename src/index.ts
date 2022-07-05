import { chdir } from 'process'
import { promises as fs } from 'fs'
import { resolve } from 'path'
import { outputFile, remove as fsRemove, copy as fsCopy, move as fsMove } from 'fs-extra'

type stringOrArray=string[] | string

export const getexport = () => {
  return fs
}

export const initialPath = (path:stringOrArray) => {
  const handlePath = typeof path === 'string' ? [path] : path
  return resolve(...handlePath)
}

// write file
export const writeFile = async (file:stringOrArray, data:string) => {
  const path = initialPath(file)
  await outputFile(path, data)
}

// read file or Dir
export const read = async (file:stringOrArray) => {
  const path = initialPath(file)
  const isFile = path.includes('.')
  if (isFile) {
    return await fs.readFile(path, { encoding: 'utf-8' })
  } else {
    return await fs.readdir(path, { encoding: 'utf-8' })
  }
}

export const copy = async (src:stringOrArray, dest:stringOrArray) => {
  const path = initialPath(src)
  const destPath = initialPath(dest)
  await fsCopy(path, destPath)
}

export const move = async (src:stringOrArray, dest:stringOrArray) => {
  const path = initialPath(src)
  const destPath = initialPath(dest)
  await fsMove(path, destPath)
}

export const remove = async (path:stringOrArray) => {
  const handlePath = initialPath(path)
  await fsRemove(handlePath)
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
