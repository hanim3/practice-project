import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import Movie from "../components/Movie";
import style from "../styles/Movie.module.css";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const response = await (
      await fetch(
      `https://yts.mx/api/v2/list_movies.json?minimum_rating=9.0&sort_by=year`
      )
    ).json();
    setMovies(response.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div style={{height: "100%"}}>
      {loading ? (
        <Loading />
      ) : ( 
        <div className={style.homeContainer}>
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id} 
              coverImg={movie.medium_cover_image} 
              title={movie.title} 
              summary={movie.summary} 
              genres={movie.genres}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;