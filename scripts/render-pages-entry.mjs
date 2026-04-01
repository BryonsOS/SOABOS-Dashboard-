import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const distDir = path.join(root, 'dist')
const distAssetsDir = path.join(distDir, 'assets')
const distIndexCandidates = [
  path.join(distDir, 'app', 'index.html'),
  path.join(distDir, 'src-index.html'),
  path.join(distDir, 'index.html')
]
const distIndex = distIndexCandidates.find((file) => fs.existsSync(file))
const rootIndex = path.join(root, 'index.html')
const root404 = path.join(root, '404.html')
const rootAssetsDir = path.join(root, 'assets')
const appIndex = path.join(root, 'app', 'index.html')

if (!distIndex) {
  throw new Error(`Missing build artifact: expected one of ${distIndexCandidates.join(', ')}`)
}

fs.mkdirSync(path.dirname(appIndex), { recursive: true })
copyFile(distIndex, appIndex)
copyFile(distIndex, rootIndex)
copyFile(distIndex, root404)
copyDir(distAssetsDir, rootAssetsDir)

function copyFile(from, to) {
  fs.mkdirSync(path.dirname(to), { recursive: true })
  fs.copyFileSync(from, to)
}

function copyDir(from, to) {
  fs.rmSync(to, { recursive: true, force: true })
  fs.mkdirSync(to, { recursive: true })
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name)
    const dst = path.join(to, entry.name)
    if (entry.isDirectory()) copyDir(src, dst)
    else fs.copyFileSync(src, dst)
  }
}
