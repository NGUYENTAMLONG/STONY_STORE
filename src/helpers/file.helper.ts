import { extname } from 'path';
import * as fs from 'fs';
export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

export const removeOneFile = (dir) => {
  fs.unlink(dir, (err) => {
    if (err) {
      console.error(`Error unlinking old thumbnail: ${err}`);
      // Handle the error (e.g., respond with an error message)
    } else {
      console.log('unlinked successfully');
      // Continue with the update process
    }
  });
};
