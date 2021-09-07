import {
    describe,
    test,
    expect,
    jest
} from '@jest/globals'

import FileHelper from '../../src/fileHelper.js'

import fs from 'fs'

import Routes from './../../src/routes.js'

describe('#FileHelper', () => {

    describe('#getFileStatus', () => {
        test('it should return files statuses in corret format', async () => {

            const statMock = {
                dev: 4009258436,
                mode: 33206,
                nlink: 1,
                uid: 0,
                gid: 0,
                rdev: 0,
                blksize: 4096,
                ino: 14355223812528212,
                size: 106325,
                blocks: 208,
                atimeMs: 1631020904056.0305,    
                mtimeMs: 1628109742994.578,     
                ctimeMs: 1631020011589.7542,    
                birthtimeMs: 1631020025543.6826,
                atime: '2021-09-07T13:21:44.056Z',
                mtime: '2021-08-04T20:42:22.995Z',
                ctime: '2021-09-07T13:06:51.590Z',
                birthtime: '2021-09-07T13:07:05.544Z'
            }

            const mockUser = 'rdgasantos'
            process.env.USER = mockUser
            const filename = 'file.png'

            jest.spyOn(fs.promises, fs.promises.readdir.name)
                .mockResolvedValue([filename])

            jest.spyOn(fs.promises, fs.promises.stat.name)
                .mockResolvedValue(statMock)

            
            const result = await FileHelper.getFilesStatus("/tmp")

            const expectedResult = [
                {
                    size: "106 kB",
                    lastModified: statMock.birthtime,
                    owner: mockUser,
                    file: filename
                }
            ]

            expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${filename}`)
            expect(result).toMatchObject(expectedResult)
        })
    })
})
