import { Card , Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    // <Container>
        <Card className='mb-3 rounded'>
          <Link to={`/product/${product._id}`}>
            <Card.Img style={{height: "280px"}} src={product.image} variant='top' />
          </Link>

          <Card.Body>
            <Link className=" text-decoration-none " to={`/product/${product._id}`}>
              <Card.Title as='div' className='product-title text-center p-0 m-0' style={{fontWeight:"600", fontSize:"20px"}}>
                {product.name}
              </Card.Title>
            </Link>

            <div className='d-flex justify-content-center'>

              <Card.Text as='h5' className='mt-2'>{product.price}.000 <small>VND</small></Card.Text>

                <Card.Text as='div' style={{paddingLeft:"30px"}}>
                  <Rating value={product.rating}/>

                  <Card.Title className='border-top'>
                    {`${product.numReviews} reviews`}
                  </Card.Title>

                </Card.Text>
                
            </div>

          </Card.Body>
        </Card>
    // </Container>
  );
};

export default Product;
