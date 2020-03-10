import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import axios from 'axios';

function Favorite(props) {


    const [favoriteNumber, setFavoriteNumber] = useState(0);
    const [favorited, setFavorited] = useState(false)

    const movieDetail = {
        userFrom: props.userFrom,
        movieId: props.movieId,
        movieTitle: props.movieInfo.original_title,
        movieImage: props.movieInfo.backdrop_path,
        movieRunTime: props.movieInfo.runtime,
        moviePost:props.movieInfo.poster_path,
    }

    // console.log(props.movieInfo.poster_path);

    useEffect(() => {
        axios.post('/api/favorite/favoriteNumber', movieDetail)
            .then(response => {
                if (response.data.success) {
                    setFavoriteNumber(response.data.FavoriteNumber);

                } else {
                    alert('Failed to get favoriteNumber')
                }
            });

        axios.post('/api/favorite/favorited', movieDetail)
            .then(response => {
                if (response.data.success) {
                    setFavorited(response.data.favorited)
                } else {
                    alert('Failed to get favorite info')
                }
            });


    }, []);

    const clickFavorite = () => {
        if (favorited) {
            //when already added
            axios.post('/api/favorite/removeFromFavorite', movieDetail)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(favoriteNumber - 1);
                        setFavorited(!favorited);
                    } else {
                        alert('Failed to remove from favorite')
                    }
                });

        } else {
            //when not adding  yet 
            axios.post('/api/favorite/addToFavorite', movieDetail)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(favoriteNumber + 1);
                        setFavorited(!favorited);
                    } else {
                        alert('Failed to add to favorite')
                    }
                });
        }
    };
    return (
        <div>
            <Button onClick={clickFavorite}>{favorited ? "Remove from favorite" : "Add to favorite"} {favoriteNumber}</Button>
        </div>
    )
}

export default Favorite
