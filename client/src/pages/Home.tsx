import { useState } from 'react';
import SearchForm from '../components/SearchForm/SearchForm';
import { IUserData } from '../components/SearchForm/types';
import SearchResults from '../components/SearchResults/SearchResults';

function Home() {
  const [searchResults, setSearchResults] = useState<IUserData[] | null>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async ({ email, number }: IUserData) => {
    const baseURL = 'http://localhost:5050';
    const searchQuery = `${email ? `email=${email}` : ''}${
      number ? `&number=${number}` : ''
    }`;

    try {
      setLoading(true);
      console.log(`${baseURL}/users?${searchQuery}`);
      const res = await fetch(`${baseURL}/users?${searchQuery}`);
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
    if (!loading && !searchResults) {
      return <p>🤷 no such a user...</p>;
    }
    if (loading) {
      return <p>🔍 searching...</p>;
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        alignItems: 'center',
      }}
    >
      <h1>2305 test</h1>
      <SearchForm onSearch={handleSearch} />
      <UserSearchResults />
    </div>
  );
}
export default Home;
