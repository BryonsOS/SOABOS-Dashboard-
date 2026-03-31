import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const distIndexPath = path.join(root, 'dist', 'app', 'index.html')
const rootIndexPath = path.join(root, 'index.html')
const root404Path = path.join(root, '404.html')
const assetsSourcePath = path.join(root, 'dist', 'assets')
const assetsTargetPath = path.join(root, 'assets')

const html = fs.readFileSync(distIndexPath, 'utf8')
fs.writeFileSync(rootIndexPath, html)
fs.writeFileSync(root404Path, html)

fs.rmSync(assetsTargetPath, { recursive: true, force: true })
fs.cpSync(assetsSourcePath, assetsTargetPath, { recursive: true })
