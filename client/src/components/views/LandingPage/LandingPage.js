import React, { useEffect, useState } from 'react'

import { API_URL, API_KEY, IAMGE_URL } from '../../Config';
import axios from 'axios';

import { Typography, Row, Button} from 'antd';
import MainImage from './Sections/MainImage';
import GridCard from './Sections/GridCard';


const { Title } = Typography;



function LandingPage() {

    // const [state, setS] = useState();
    const [Movies, setMovies] = useState([]);
    const [currentPage, setcurrentPage] = useState(0)

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovies(endpoint);
       
    }, [])

    const fetchMovies = (path)=>{
        //get popular movie list 
        // `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        fetch(path)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            setMovies([...Movies, ...response.results])
            setcurrentPage(response.page)
        })
    // console.log("effect run");
    }
   
    

    const handleClick = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage + 1}`;
        fetchMovies(endpoint)

    }


    return (
        <div style={{ width: '100%', margin: 0, }}>

            {/* //main image */}
            {Movies[0] && <MainImage
                image={`${IAMGE_URL}w1280${Movies[0].backdrop_path}`}
                title={`${Movies[0].original_title}`}
                text={`${Movies[0].overview}`} />
            }


            {/* body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>
                <Title level={2}>Movies by latest</Title>
                <hr />


                {/* grid card */}

                <Row gutter={[16, 16]}>
                    {Movies && Movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            <GridCard
                                image={movie.poster_path && `${IAMGE_URL}w500${movie.poster_path}`}
                                moviedId={movie.id}
                            />
                        </React.Fragment>
                    ))}
                </Row>

                {/* loading more button  */}
                <br />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button onClick={handleClick}>Load More</Button>
                </div>



            </div>


        </div>
    )
}

export default LandingPage
