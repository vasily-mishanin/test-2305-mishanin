import fs from 'fs';
import path from 'path';
import { validateEmail } from '../../utils/validate';
import { NextRequest, NextResponse } from 'next/server';
//let currentTimeout: NodeJS.Timeout | null = null;
const DELAY = 3000;

type IUserData = {
  email: string;
  number: string;
};

export async function GET(req: NextRequest, res: NextResponse) {
  // if (currentTimeout) {
  //   clearTimeout(currentTimeout);
  // }
  const searchParams = req.nextUrl.searchParams;
  const email = searchParams.get('email') || '';
  const number = searchParams.get('number') || '';

  if (!email && !number) {
    return NextResponse.json(
      { error: 'Please provide an email, a number, or both.' },
      { status: 400 }
    );
  }

  if (!validateEmail(email)) {
    return NextResponse.json({ error: 'Email is not valid' }, { status: 400 });
  }

  // currentTimeout = setTimeout(async () => {
  const results = await getUser(email, number);

  if (!results) {
    return NextResponse.json(
      { error: 'No users found with the provided criteria.' },
      { status: 204 }
    );
  }
  return NextResponse.json(results, { status: 200 });
  //}, DELAY);
}

const getDataFromFile = async (): Promise<IUserData[]> => {
  const filePath = path.join(process.cwd(), 'app', 'userData.json');
  const fileData = await fs.promises.readFile(filePath, 'utf-8');
  return JSON.parse(fileData) as IUserData[];
};

const getUser = async (
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
  });
  return results;
};
