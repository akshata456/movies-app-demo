import React, { useEffect, useState } from 'react'
import ReactTable from 'react-table-6'
import api from '../api'

import styled from 'styled-components'

import 'react-table-6/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`

const UpdateMovie: React.FC<{id:string}> = ({id}) => {
    const updateUser = (event:any) => {
        event.preventDefault()
        window.location.href = `/movies/update/${id}`
    }

    
    return <Update onClick={updateUser}>Update</Update>
    
}

const DeleteMovie: React.FC<{ id: string }> = ({ id }) => {
    const deleteUser = (event: any) => {
        event.preventDefault()

        if (
            window.confirm(
                `Do tou want to delete the movie ${id} permanently?`,
            )
        ) {
            api.deleteMovieById(id)
            window.location.reload()
        }
    }

    return <Delete onClick={(event)=>deleteUser(event)}>Delete</Delete>
    
}

const MoviesList: React.FC = () => {
    const [moviesList, setMoviesList] = useState({
            movies: [],
            columns: [],
            isLoading: false,
        });
   
    useEffect(() => { 
        setMoviesList({ ...moviesList, isLoading: true });
        api.getAllMovies().then(movies => {
             setMoviesList({
                ...moviesList,
                movies: movies.data.data,
                isLoading: false,
            })
        })
    },[])

        const { movies, isLoading } = moviesList

        const columns = [
            {
                Header: 'ID',
                accessor: '_id',
                filterable: true,
            },
            {
                Header: 'Name',
                accessor: 'name',
                filterable: true,
            },
            {
                Header: 'Rating',
                accessor: 'rating',
                filterable: true,
            },
            {
                Header: 'Time',
                accessor: 'time',
                Cell: (props:any) => <span>{props.value.join(' / ')}</span>,
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props:any) {
                    return (
                        <span>
                            <DeleteMovie id={props.original._id} />
                        </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props:any) {
                    return (
                        <span>
                            <UpdateMovie id={props.original._id} />
                        </span>
                    )
                },
            },
        ]

        let showTable = true
        if (!movies.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={movies}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    
}

export default MoviesList