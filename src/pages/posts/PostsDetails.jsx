import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import d from "./Posts.module.css"

const PostsDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  console.log(params);

  const [post, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setError("");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {loading || !post ? (
        "loading..."
      ) : (
        <div className={d.content2}>
          <button onClick={() => navigate( "/posts")}>Back</button>
       <h1 className={d.nav}> {post.id} <br />  {post.title} <br /></h1>
       <div> {post.body}</div>
        </div>
      )}
    </div>
  );
};

export default PostsDetails;
