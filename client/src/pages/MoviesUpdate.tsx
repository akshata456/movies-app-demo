import React, { useEffect, useState } from 'react'

import api from '../api'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

const MoviesUpdate: React.FC<{ id?: string }> = ({id}) => {
    const params = useParams();

    const [movie, setMovie] = useState<{
        id?: string,
        name: string,
        rating: string,
        time: string,
    }>({
        name: '',
        rating: '',
        time: '',
    })
  

    const handleChangeInputName = (event:any) => {
        const name = event.target.value
        setMovie({...movie,name:name})
    }

    const handleChangeInputRating = (event:any) => {
        const rating = event.target.validity.valid
            ? event.target.value
            : movie.rating

        setMovie({...movie,rating})
    }

    const handleChangeInputTime = (event:any) => {
        const time = event.target.value
       setMovie({...movie,time})
    }

    const handleUpdateMovie = async () => {
        const { id, name, rating, time } = movie
        const arrayTime = time.split('/')
        const payload = { name, rating, time: arrayTime }

        await api.updateMovieById(id, payload).then(res => {
            window.alert(`Movie updated successfully`)
            setMovie({
                name: '',
                rating: '',
                time: '',
            })
        })
    }

    useEffect(() => {
        const id = params.id;
        const getMovies = async () => { 
            const movie = await api.getMovieById(id)
            setMovie({
                id:id,
                name: movie.data.data.name,
                rating: movie.data.data.rating,
                time: movie.data.data.time.join('/'),
            })
        }
        getMovies();
    },[])

   
    const { name, rating, time } = movie
    return (
        <Wrapper>
            <Title>Create Movie</Title>

            <Label>Name: </Label>
            <InputText
                type="text"
                value={name}
                onChange={handleChangeInputName}
            />

            <Label>Rating: </Label>
            <InputText
                type="number"
                step="0.1"
                lang="en-US"
                min="0"
                max="10"
                pattern="[0-9]+([,\.][0-9]+)?"
                value={rating}
                onChange={handleChangeInputRating}
            />

            <Label>Time: </Label>
            <InputText
                type="text"
                value={time}
                onChange={handleChangeInputTime}
            />

            <Button onClick={handleUpdateMovie}>Update Movie</Button>
            <CancelButton href={'/movies/list'}>Cancel</CancelButton>
        </Wrapper>
    )
    
}

export default MoviesUpdate