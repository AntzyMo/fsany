import { describe, expect, it } from 'vitest'
import {read,getRootPath} from './index'


describe('readfiles',()=>{
  it.skip('readfile',async()=>{
      expect( await read('./index.ts')).toMatchInlineSnapshot('Promise {}')
  }),
  it('rootpath',async()=>{
    await expect(getRootPath('./index.ts')).toMatchInlineSnapshot('"E:\\\\testBox\\\\AntzyMo\\\\fsany\\\\index.ts"')
 })
})
