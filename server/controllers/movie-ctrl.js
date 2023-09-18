const Movie = require('../db/index')

createMovie = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a movie',
        })
    }

    const movie = new Movie(body)

    if (!movie) {
        return res.status(400).json({ success: false, error: err })
    }

    movie
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: movie._id,
                message: 'Movie created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Movie not created!',
            })
        })
}

updateMovie = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    const filter = { _id: req.params.id }
    const update = { name: body.name, time: body.time, rating: body.rating }
    let doc = await Movie.findOneAndUpdate(filter, update);
    if (doc) {
         return res.status(200).json({
                success: true,
                id: req.params.id,
                message: 'Movie updated!',
        })
    } else {
         return res.status(404).json({
                    error,
                    message: 'Movie not updated!',
                })
    }
}

deleteMovie = async (req, res) => {
    await Movie.findOneAndDelete({ _id: req.params.id });
}

getMovieById = async (req, res) => {
    const movie = await Movie.findOne({ _id: req.params.id });
      if (!movie) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }
        return res.status(200).json({ success: true, data: movie })
}

getMovies = async (req, res) => {
    const moviesList = await Movie.find();
      if (!moviesList.length) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
      }
        return res.status(200).json({ success: true, data: moviesList })


}

module.exports = {
    createMovie,
    updateMovie,
    deleteMovie,
    getMovies,
    getMovieById,
}