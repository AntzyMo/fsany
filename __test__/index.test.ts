import { describe, expect, it } from 'vitest'
import { read, getexport, write } from '../src/index'
describe('fs', () => {
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

  it.skip('read', async () => {
    const path = '../src/index.js'
    expect(await read(path)).toMatchInlineSnapshot(`
      "import { chdir } from 'process'
      import { promises as fs } from 'fs'
      import { isAbsolute } from 'path'
      import { fileURLToPath, URL } from 'url'
      export const getexport = () => {
        return fs
      }

      const initialPath = (path:string) => {
        if (isAbsolute(path)) {
          return path
        } else {
          return fileURLToPath(new URL(path, import.meta.url))
        }
      }

      // 读取文件
      export const read = async (arg:string) => {
        const path = initialPath(arg)
        return await fs.readFile(path, { encoding: 'utf-8' })
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

  it('write', async () => {
    const path = '../cs/c.js'
    const data = 'consoel'
    expect(await write(path, data))
  })
})
