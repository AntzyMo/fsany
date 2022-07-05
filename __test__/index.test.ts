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

it('initialPath', () => {
  const path = 'test/vvv'
  const pathArr = ['tsts', '1', '2']
  expect(initialPath(path)).toMatchInlineSnapshot('"E:\\\\testBox\\\\AntzyMo\\\\fsany\\\\test\\\\vvv"')

  expect(initialPath(pathArr)).toMatchInlineSnapshot('"E:\\\\testBox\\\\AntzyMo\\\\fsany\\\\tsts\\\\1\\\\2"')
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

it('read', async () => {
  const path = 'src/index.ts'
  expect(await read(path)).toMatchInlineSnapshot(`
    "import { chdir } from 'process'
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
    "
  `)
})
