import { describe, expect, it } from 'vitest'
import { read, getexport, writeFile, initialPath } from '../src/index'

it.skip('exports', async () => {
  await expect(getexport()).toMatchInlineSnapshot(`
      {
        "access": [Function],
        "appendFile": [Function],
        "chmod": [Function],
        "chown": [Function],
        "copyFile": [Function],
        "cp": [Function],
        "lchmod": [Function],
        "lchown": [Function],
        "link": [Function],
        "lstat": [Function],
        "lutimes": [Function],
        "mkdir": [Function],
        "mkdtemp": [Function],
        "open": [Function],
        "opendir": [Function],
        "readFile": [Function],
        "readdir": [Function],
        "readlink": [Function],
        "realpath": [Function],
        "rename": [Function],
        "rm": [Function],
        "rmdir": [Function],
        "stat": [Function],
        "symlink": [Function],
        "truncate": [Function],
        "unlink": [Function],
        "utimes": [Function],
        "watch": [Function],
        "writeFile": [Function],
      }
    `)
})

it.skip('initialPath', () => {
  const path = './index.js'
  const pathArr = ['tsts', '1', '2']
  expect(initialPath(path)).toMatchInlineSnapshot('"/Users/antzymo/Desktop/AntzyMo/fsany/index.js"')

  expect(initialPath(pathArr)).toMatchInlineSnapshot('"/Users/antzymo/Desktop/AntzyMo/fsany/tsts/1/2"')
})

describe.skip('writeTest', () => {
  it('writePass', async () => {
    const path = '__test__/index.js'
    const data = 'consoel'
    expect(await writeFile(path, data))
  })

  it('writeNoDir', async () => {
    const path = 'cd/index.js'
    const data = 'consoel'
    expect(await writeFile(path, data))
  })
})

describe.skip('read', () => {
  it('readfile', async () => {
    const path = 'src/index.ts'
    expect(await read(path)).toMatchInlineSnapshot(`
      "import { chdir } from 'process'
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
        } catch (err) {
          Promise.reject(err)
        }
      }
      "
    `)
  })
  it('readDir', async () => {
    const path = 'src'
    expect(await read(path)).toMatchInlineSnapshot(`
      [
        "index.ts",
      ]
    `)
  })
})
