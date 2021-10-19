import React, { useState, useEffect, useRef } from 'react';
import './PostList.css';

export default function PostList(props) {
  const [posts, setPosts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  let { search } = props;
  let searchedPosts = useRef([]);

  useEffect(() => {
    fetch(
      'http://localhost:8000/api/posts?tags=history,tech,science,health,startups,culture,design'
    )
      .then((res) => res.json())
      .then((result) => {
        setPosts(result.posts);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!isLoading && search) {
      setIsLoading(true);
      searchedPosts.current = posts.filter((post) => {
        const tags = [...post.tags];
        let match = false;
        for (let i = 0; i < tags.length; i++) {
          if (tags[i].includes(search)) {
            match = true;
          }
        }
        return match;
      });
      setIsLoading(false);
    }
  }, [search, posts, isLoading]);

  return (
    <div className="d-flex flex-wrap justify-content-between list">
      {!isLoading &&
        search &&
        searchedPosts.current.map((post, i) => {
          return (
            <div key={i} className="card mx-2 post">
              <img
                src="https://via.placeholder.com/150"
                className="card-img-top"
                alt="placeholder"
              />
              <div className="card-body text-start">
                <h5 className="card-title text-start">Lorem Ipsum</h5>
                <p className="card-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  consequat enim mi, eget pulvinar sem pharetra nec. Quisque
                  egestas urna at consequat scelerisque.
                </p>
                <p className="card-text">By: {post.author}</p>
                <p className="card-text">
                  <span>Likes: {post.likes}</span>
                </p>
                <p className="card-text">
                  {post.tags.map((tag, i) => {
                    return <span key={i}>#{tag} </span>;
                  })}
                </p>
              </div>
            </div>
          );
        })}
      {!isLoading &&
        !search &&
        posts.map((post, i) => {
          return (
            <div key={i} className="card mx-2 post">
              <img
                src="https://via.placeholder.com/150"
                className="card-img-top"
                alt="placeholder"
              />
              <div className="card-body text-start">
                <h5 className="card-title text-start">Lorem Ipsum</h5>
                <p className="card-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  consequat enim mi, eget pulvinar sem pharetra nec. Quisque
                  egestas urna at consequat scelerisque.
                </p>
                <p className="card-text">By: {post.author}</p>
                <p className="card-text">
                  <span>Likes: {post.likes}</span>
                </p>
                <p className="card-text">
                  {post.tags.map((tag, i) => {
                    return <span key={i}>#{tag} </span>;
                  })}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
}
