import fs from "fs";

export function createTestFolder(dir: string) {
  const testDir = `./data/${dir}`;

  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
  }
}

export function deleteTestFolder(dir: string) {
  const testDir = `./data/${dir}`;

  if (fs.existsSync(testDir)) {
    fs.unlinkSync(testDir);
  }
}
