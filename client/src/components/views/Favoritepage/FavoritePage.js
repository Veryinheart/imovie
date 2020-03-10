import React, { useEffect, useState } from 'react';
import { Table, Tag, Popover, Button } from 'antd';
import Axios from 'axios';
import { API_URL, API_KEY, IMAGE_URL } from '../../Config';


function FavoritePage() {

    const [FavoriteMovies, setFavoriteMovies] = useState([]);
    const [fresh, setFresh] = useState(false);
    

    const favoritedMoviesInfo = {
        userFrom: localStorage.getItem('userId'),
    };
    const fetchFavoritedMovies = () => {
        Axios.post('/api/favorite/getFavoritedMovies', favoritedMoviesInfo)
            .then(response => {
                if (response.data.success) {
                    let tempList = [];
                    response.data.favorites.map((movie, index) => {
                        let tempMovie = {};
                        tempMovie.key =  movie._id;
                        tempMovie.title = movie.movieTitle;
                        tempMovie.runtime = movie.movieRunTime + ' mins';
                        tempMovie.Image = movie.movieImage;
                        tempMovie.moviePost = movie.moviePost;
                        tempMovie.moviedId = parseInt(movie.movieId);
                        tempMovie.moviedIdString=movie.movieId;
                        tempMovie.id = movie._id;
                        tempList.push(tempMovie);
                    });
                    setFavoriteMovies(tempList);
                } else {
                    alert('Failed to get favorited movies')
                }
            })
    }
    useEffect(() => {
        fetchFavoritedMovies();
    }, []);

    useEffect(() => {
        console.log(FavoriteMovies)
        
    }, [FavoriteMovies])


    const columns = [
        {
            title: 'Movie Title',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => (<Popover content={
                <div>
                    {record.moviePost ?
                        <img src={`${IMAGE_URL}w185${record.moviePost}`} alt="moviePost" /> :
                        "no Image"
                    }
                </div>
            } title={record.title}>
                <a href={`movie/${record.moviedId}`}>{text}</a>
            </Popover>)
        },
        {
            title: 'Movie Runtime',
            dataIndex: 'runtime',
            key: 'rubtime',
        },
        // {
        //     title: 'Tags',
        //     key: 'tags',
        //     dataIndex: 'tags',
        //     render: tags => (
        //         <span>
        //             {tags.map(tag => {
        //                 let color = tag.length > 5 ? 'geekblue' : 'green';
        //                 if (tag === 'loser') {
        //                     color = 'volcano';
        //                 }
        //                 return (
        //                     <Tag color={color} key={tag}>
        //                         {tag.toUpperCase()}
        //                     </Tag>
        //                 );
        //             })}
        //         </span>
        //     ),
        // },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    {/* <a>Delete</a> */}
            <Button onClick={() => onClickRemove(record)}>Delete</Button>
                </span>
            ),
        },
    ];


    const onClickRemove = (record) => {
       
         const movieDetail = {
            userFrom: localStorage.getItem('userId'),
            movieId: record.moviedIdString,
        };
     
        Axios.post('/api/favorite/removeFromFavorite', movieDetail)
            .then(response => {
                if (response.data.success) {
                    
                    fetchFavoritedMovies();     
                } else {
                    alert('Failed to remove from favorite')
                }
            });
    }



    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h3>Favorite Movies By Me</h3>
            <hr />
            <Table columns={columns} dataSource={FavoriteMovies} />
        </div>
    )
}

export default FavoritePage
