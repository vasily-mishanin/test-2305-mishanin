import styles from './SearchResults.module.css';
import { SearchResultsProps } from './types';

function SearchResults({ data }: SearchResultsProps) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
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
    </div>
  );
}
export default SearchResults;
