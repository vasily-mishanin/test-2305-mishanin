'use client';
import SearchForm from './components/SearchForm';
import { IUserData } from './components/SearchForm/types';
import { useState } from 'react';
import SearchResults from './components/SearchResults';
import { delay } from './utils/delay';

export default function Home() {
  const [searchResults, setSearchResults] = useState<IUserData[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async ({ email, number }: IUserData) => {
    const searchQuery = `${email ? `email=${email}` : ''}${
      number ? `&number=${number}` : ''
    }`;

    try {
      setLoading(true);
      await delay(3000);
      const res = await fetch(`api/users?${searchQuery}`);
      setLoading(false);
      if (res.status === 204) {
        setSearchResults(null);
      }
      const searchResults: IUserData[] = await res.json();
      console.log({ res, searchResults });
      setSearchResults(searchResults);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log(error);
      }
    }
  };

  const UserSearchResults = () => {
    if (!loading && searchResults && searchResults.length > 0) {
      return <SearchResults data={searchResults} />;
    }
    if (!loading && searchResults?.length === 0) {
      return <p>🤷 no such a user...</p>;
    }
    if (loading) {
      return <p>🔍 searching...</p>;
    }
  };

  return (
    <main className='flex flex-col items-center justify-between p-24'>
      <h1 className='text-2xl mb-8'>3205 test - V. Mishanin</h1>
      <SearchForm onSearch={handleSearch} disabled={loading} />
      <UserSearchResults />
    </main>
  );
}
