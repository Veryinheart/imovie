import React, { useEffect, useState } from 'react';
import { API_URL, API_KEY, IAMGE_URL } from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import { Descriptions, Badge, Button, Row, Typography } from 'antd';

import GridCard from '../LandingPage/Sections/GridCard';
import Favorite from './Sections/Favorite';

const { Title } = Typography;

function MovieDetailPage(props) {

    const [Movie, setMovie] = useState([]);

    const [Casts, setCasts] = useState([]);

    const [Toggle, setToggle] = useState(false);

    const MovieId = props.match.params.movieId;
    useEffect(() => {
        // console.log(props)
        const movieId = props.match.params.movieId;

        fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
            .then(response => response.json())
            .then(response => {
                // console.log(response)
                setMovie(response);

                fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
                    .then(response => response.json())
                    .then(response => {
                        // console.log(response.cast)
                        setCasts(response.cast);
                    })
            })
    }, [])


    const handleToggle = () => {
        setToggle(!Toggle);
    }
    

    return (
        <div>


            {/* main image */}
            {Movie && <MainImage
                image={`${IAMGE_URL}w1280${Movie.backdrop_path}`}
                title={`${Movie.original_title}`}
                text={`${Movie.overview}`} />
            }

            {/* info table */}
            <div style={{ width: '85%', margin: '2rem auto' }}>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                   <Favorite 
                    userFrom={localStorage.getItem('userId')}
                    movieId={MovieId}
                    movieInfo={Movie}/>
                </div>

                <Descriptions title="Movie Info" bordered>
                    <Descriptions.Item label="Title">{Movie.title}</Descriptions.Item>
                    <Descriptions.Item label="Relase date">{Movie.release_date}</Descriptions.Item>
                    <Descriptions.Item label="Revenue">{Movie.revenue}</Descriptions.Item>
                    <Descriptions.Item label="Runtime">{Movie.runtime} mins</Descriptions.Item>
                    <Descriptions.Item label="Vote average" span={2}>
                        {Movie.vote_average}
                    </Descriptions.Item>
                    {/* <Descriptions.Item label="Status" span={3}>
                        <Badge status="processing" text="Running" />
                    </Descriptions.Item> */}
                    <Descriptions.Item label="Vote_count">{Movie.vote_count}</Descriptions.Item>
                    <Descriptions.Item label="Status">{Movie.status}</Descriptions.Item>
                    <Descriptions.Item label="popularity">{Movie.popularity}</Descriptions.Item>
                    <Descriptions.Item label="Overview">
                        {Movie.overview}
                    </Descriptions.Item>
                </Descriptions>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={handleToggle}>
                    {Toggle ? "Hide Casts" : " View Casts"}
                </Button>
            </div>

            {Toggle &&

                <div style={{ width: '85%', margin: '1rem auto' }}>
                    <Title level={2}>Cast in the movie</Title>
                    {/* grid part for crews */}

                    <Row gutter={[16, 16]}>
                        {Casts && Casts.map((cast, index) => (
                            <React.Fragment key={index}>
                                {cast.profile_path &&
                                    <GridCard
                                        actor
                                        image={`${IAMGE_URL}w500${cast.profile_path}`}
                                        character={cast.character}
                                    />}
                            </React.Fragment>
                        ))}
                    </Row>
                </div>

            }




        </div>
    )
}

export default MovieDetailPage
