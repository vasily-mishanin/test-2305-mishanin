import { SearchResultsProps } from './types';

function SearchResults({ data }: SearchResultsProps) {
  return (
    <table className='table table-zebra max-w-lg'>
      <thead>
        <tr>
          <th>Email</th>
          <th>Phone Number</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.email + item.number}>
            <td>{item.email}</td>
            <td>{item.number}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default SearchResults;
