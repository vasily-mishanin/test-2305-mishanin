import fs from 'fs';
import path from 'path';

type IUserData = {
  email: string;
  number: string;
};

const getDataFromFile = async (): Promise<IUserData[]> => {
  const filePath = path.join(__dirname, '../data.json');
  const fileData = await fs.promises.readFile(filePath, 'utf-8');
  return JSON.parse(fileData) as IUserData[];
};

export const getUser = async (
  email?: string,
  number?: string
): Promise<IUserData[]> => {
  const usersData = await getDataFromFile();

  const results: IUserData[] = usersData.filter((user: IUserData) => {
    if (email && number) {
      return user.email.includes(email) && user.number.includes(number);
    } else if (email) {
      return user.email.includes(email);
    } else if (number) {
      return user.number.includes(number);
    }
    return false;
  });

  return results;
};
