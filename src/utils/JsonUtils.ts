import * as fs from 'fs';
import path from 'path';

export const updateJsonFile = (data: unknown) => {
  const filePath = path.join(__dirname, '../mocks/OfficeMock.json');
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing to file:', error);
    return false;
  }
};