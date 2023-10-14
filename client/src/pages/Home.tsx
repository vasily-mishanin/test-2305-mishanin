import { useState } from 'react';
import SearchForm from '../components/SearchForm/SearchForm';
import { IUserData } from '../components/SearchForm/types';
import SearchResults from '../components/SearchResults/SearchResults';

function Home() {
  const [searchResults, setSearchResults] = useState<IUserData[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async ({ email, number }: IUserData) => {
    const BASE_URL = 'http://localhost:5050';
    const searchQuery = `${email ? `email=${email}` : ''}${
      number ? `&number=${number}` : ''
    }`;

    try {
      setLoading(true);
      console.log(`${BASE_URL}/users?${searchQuery}`);
      const res = await fetch(`${BASE_URL}/users?${searchQuery}`);
      setLoading(false);
      if (res.status === 204) {
        setSearchResults(null);
      }
      const searchResults: IUserData[] = await res.json();
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

  console.log({ searchResults });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        alignItems: 'center',
      }}
    >
      <h1>3205 test - V. Mishanin</h1>
      <SearchForm onSearch={handleSearch} />
      <UserSearchResults />
    </div>
  );
}
export default Home;
