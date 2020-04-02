import React from 'react';
import { Col, Card,HeartTwoTone} from 'antd';

const { Meta } = Card;

function GridCard(props) {

    // console.log(props)

    if (props.actor) {
        return (
            <div>
                <Col lg={4} md={8} xs={24}>
                    <div style={{ position: 'relative' }}>
                        <img style={{ width: '100%', height: '300px' }} alt="img" src={props.image} />
                        <p>{props.character}</p>
                    </div>
                </Col>
            </div>

        )
    } else {

        return (
            <div>
                <Col lg={6} md={8} xs={24}>
                    <div style={{ position: 'relative' }}>
                        {/* <div> */}
                        {/* <a >
                            <img style={{ width: '100%', height: '450px' }} alt="img" src={props.image} />
                        </a> */}
                        <a href={`/movie/${props.moviedId}`}>
                        <Card
                            hoverable
                            // style={{ height:300 }}
                            cover={<img alt="example" src={props.image} style={{ width: '100%', height: '450px' }} />}
                        >
                            <Meta title={props.title}/>
                            {/* <HeartTwoTone/> */}
                        </Card>
                        </a>
                    </div>
                </Col>
            </div>
        )

    }


}

export default GridCard
