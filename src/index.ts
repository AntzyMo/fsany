import { chdir, cwd } from 'process'
import { promises as fs } from 'fs'
import { resolve } from 'path'
import fskit from 'fs-extra'

type stringOrArray=string[] | string

export const initialPath = (path:stringOrArray) => {
  const handlePath = typeof path === 'string' ? [path] : path
  return resolve(cwd(), ...handlePath)
}

// write file
export const writeFile = async (file:stringOrArray, data:string) => {
  const path = initialPath(file)
  await fskit.outputFile(path, data)
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
  await fskit.copy(path, destPath)
}

export const move = async (src:stringOrArray, dest:stringOrArray) => {
  const path = initialPath(src)
  const destPath = initialPath(dest)
  await fskit.move(path, destPath)
}

export const remove = async (path:stringOrArray) => {
  const handlePath = initialPath(path)
  await fskit.remove(handlePath)
}

export const getJSON = async (path:stringOrArray) => {
  const handlePath = initialPath(path)
  const json = await fskit.readJSON(handlePath)

  const save = async () => {
    await fskit.writeJSON(handlePath, json)
  }

  return { json, save }
}

// 进入目录
export const cd = async (path:stringOrArray) => {
  const handlePath = initialPath(path)

  try {
    await chdir(handlePath)
    return cwd()
  } catch (err) {
    return Promise.reject(err)
  }
}
