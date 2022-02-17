import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const { id } = useParams();
  const getMovie = async () => {
    const response = await (
      await fetch(
        `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
      )
    ).json();
    setMovie(response.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  console.log(movie);
  return (
    loading ? (
      <h1>Loading ...</h1>
    ) : (
      <div>
        <h1>{movie.title}</h1>
        <img src={movie.medium_cover_image} alt={movie.title} />
      </div>
    )
  )
}

export default Detail;