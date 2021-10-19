import { useState } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import PostList from '../PostList/PostList';

function App() {
  const [search, setSearch] = useState('');
  return (
    <div className="d-flex flex-column text-center vh-100">
      <Searchbar sendSearch={setSearch} />
      <PostList search={search} />
    </div>
  );
}

export default App;
