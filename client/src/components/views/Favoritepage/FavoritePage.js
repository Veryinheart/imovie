import React, { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import Axios from 'axios';

function FavoritePage() {

    const [FavoriteMovies, setFavoriteMovies] = useState([]);
    const [num, setNum] = useState(0);

    const favoritedMoviesInfo = {
        userFrom: localStorage.getItem('userId'),
    };

    useEffect(() => {
        Axios.post('/api/favorite/getFavoritedMovies', favoritedMoviesInfo)
             .then(response => {
                 console.log(response.data.success)
                if (response.data.success) {
                    setFavoriteMovies(response.data.favorites);
                    // let tempList = []
                    setNum(num +1);
                    console.log(num);
                    console.log(FavoriteMovies)

                    console.log(response.data.favorites)
                    // FavoriteMovies.map((movie,index)=>{
                    //     console.log("11")
                    //     let tempMovie = {}
                    //     tempMovie.index= index
                    //     tempMovie.title = movie.movieTitle;
                    //     tempMovie.runtime = movie.movieRunTime;
                    //     tempMovie.Image = movie.movieImage;
                    //     tempMovie.id = movie._id;
                    //     tempList.push(tempMovie);
                    //     // tempMovie = {}
                    //     console.log(tempMovie)
                    // })
                    // console.log(tempList)
                    // setFavoriteMovies([...FavoriteMovies,...tempList]);
                    // console.log(FavoriteMovies);
                } else {
                    alert('Failed to get favorited movies')
                }
            })
    }, [])

    const columns = [
        {
            title: 'Movie Title',
            dataIndex: 'title',
            key: 'title',
            render: text => <a>{text}</a>,
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

                    <a>Delete</a>
                </span>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            title: 'John Brown',
            runtime: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];






    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h3>Favorite Movies By Me</h3>
            <hr />

            <Table columns={columns} dataSource={data} />
        </div>
    )
}

export default FavoritePage
