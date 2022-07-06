import { describe, expect, it } from 'vitest'
import { getJSON, read, writeFile, initialPath } from '../src/index'

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

it('json', async () => {
  const path = 'package.json'
  const { json } = await getJSON(path)
  expect(json).toMatchInlineSnapshot(`
    {
      "author": "AntzyMo <mozbnao@163.com>",
      "bugs": {
        "url": "https://github.com/AntzyMo/fsany/issues",
      },
      "dependencies": {
        "fs-extra": "^10.1.0",
        "typescript": "^4.7.4",
      },
      "description": "is a fs toolkit",
      "devDependencies": {
        "@antzy/eslint-config": "^0.0.3",
        "@types/fs-extra": "^9.0.13",
        "@types/node": "^18.0.0",
        "eslint": "^8.19.0",
        "tsup": "^6.1.3",
        "vitest": "^0.16.0",
      },
      "exports": {
        ".": {
          "default": "./dist/index.js",
          "require": "./dist/index.cjs",
        },
      },
      "files": [
        "dist",
      ],
      "homepage": "https://github.com/AntzyMo/fsany#readme",
      "keywords": [
        "fs",
      ],
      "license": "ISC",
      "main": "./distindex.js",
      "name": "fsany",
      "publishConfig": {
        "access": "public",
      },
      "repository": {
        "type": "git",
        "url": "git+https://github.com/AntzyMo/fsany.git",
      },
      "scripts": {
        "build": "tsup ./src/index.ts --format esm,cjs --dts",
        "test": "vitest -w",
      },
      "type": "module",
      "types": "./dist/index.d.ts",
      "version": "0.0.2",
    }
  `)
})
