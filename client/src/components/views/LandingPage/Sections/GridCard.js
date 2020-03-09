import React from 'react';
import {Col} from 'antd';

function GridCard(props) {



    if(props.actor){
        return (
            <div>
                 <Col lg={4} md={8} xs={24}>
                    <div style={{position:'relative'}}>
                            <img style={{width:'100%',height:'300px'}}  alt="img" src={props.image}/>
                            <p>{props.character}</p>
                    </div>
                </Col>
            </div>

        )
    }else{

        return (
            <div>
                <Col lg={6} md={8} xs={24}>
                    <div style={{position:'relative'}}>
                        <a href={`/movie/${props.moviedId}`}>
                            <img style={{width:'100%',height:'450px'}}  alt="img" src={props.image}/>
                        </a>
                    </div>
                </Col>
            </div>
        )

    }

    
}

export default GridCard
