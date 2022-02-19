import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaStar, FaChevronLeft } from "react-icons/fa"
import style from "../styles/Movie.module.css";
import Loading from "../components/Loading";

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
      <Loading />
    ) : (
      <div>
        <div className={style.detailContainer}>
          <div className={style.headerContainer}>
            <Link to={'/movie'} style={{color: 'black'}}><FaChevronLeft className={style.backIcon} /></Link>
            <h1>{movie.title_long}</h1>
          </div>
          <img src={movie.medium_cover_image} alt={movie.title} className={style.movieImg} />
          <div style={{margin: '10px'}}>
            {Array(parseInt(movie.rating))
              .fill(movie.rating)
              .map((ra, index) => (
                <FaStar color="gold" size={25} key={index} />
              )
            )}
          </div>
          <h3>Genres: {movie.genres.join(', ')}</h3>
          <p style={{margin: '20px 100px', fontSize: '18px'}}>{movie.description_full}</p>
        </div>
        <img src={movie.background_image} className={style.back}></img>
      </div>
    )
  )
}

export default Detail;