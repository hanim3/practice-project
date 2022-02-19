import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import style from "../styles/Movie.module.css";
function Movie({ id, coverImg, title, summary, genres }) {
  return (
    <div className={style.movieContainer}>
      <img src={coverImg} alt={title} className={style.movieImg} />
      <div className={style.movieAtr}>
        <h2>
          <Link to={`/movie/${id}`} className={style.movieTitle}>{title}</Link>
        </h2>
        <p>{summary.length > 235 ? `${summary.slice(0, 235)}...` : summary}</p>
        <h3>Genres</h3>
        <ul>
          {genres.map((genre) => (
            <li key={genre}>{genre}</li>
          ))}
        </ul>
      </div>
      <div className={style.imgCover} />
    </div>
  )
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Movie;