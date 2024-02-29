import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import banner2 from "../assets/images/6.png"
import banner3 from "../assets/images/7.png"
import banner from "../assets/images/banner.jpg"

const ProductCarousel = () => {

  return (
    <Carousel pause='hover'>

        <Carousel.Item style={{height: "auto", objectFit:'fill', width: '100%'}}>
            <Image src={banner} alt={banner} fluid />
        </Carousel.Item>

        <Carousel.Item style={{height: "auto", objectFit:'fill', width: '100%'}}>
            <Image src={banner2} alt={banner2} fluid />
        </Carousel.Item>

     
    </Carousel>
  );
};

export default ProductCarousel;
