import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import d from './Posts.module.css';

const Posts = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setError("");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={d.container}>
      {loading || !users.length
        ? "loading..."
        : users.map((el) => {
            return (
              <div key={el.id} className={d.content}>
                <h1 className={d.nav}>{el.id} <br /> {el.title}
                 <button onClick={() => navigate(`/posts/${el.id}`)}>Details</button></h1>
                 <div className={d.ser}> <div className={d.text}>{el.body}</div>
                <Link to={`/posts/${el.id}`}> More... </Link> </div>
              </div>
            );
          })}
    </div>
  );
};

export default Posts;
