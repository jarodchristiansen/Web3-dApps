import classes from './landing-explainer.module.css'
import {Carousel} from "react-bootstrap";

function LandingExplainer() {
    return (

        <div>
            <Carousel fade>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://blog.equinix.com/wp-content/uploads/2015/07/interconnected-locations-network-enterprise.jpg"
                        alt="First slide"
                        style={{maxHeight: "300px"}}
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://blog.equinix.com/wp-content/uploads/2015/07/interconnected-locations-network-enterprise.jpg"
                        alt="Second slide"
                        style={{maxHeight: "300px"}}
                    />

                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://blog.equinix.com/wp-content/uploads/2015/07/interconnected-locations-network-enterprise.jpg"
                        alt="Third slide"
                        style={{maxHeight: "300px"}}
                    />

                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

        </div>
    )
}


export default LandingExplainer;