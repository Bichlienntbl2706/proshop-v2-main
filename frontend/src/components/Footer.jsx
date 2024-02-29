import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='shadow p-3 bg-body rounded'>
      <Container>
        <Row>
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">
                <strong>DEPURETÉ </strong> Natural Essential Oils
              </h6>
              <p>
              Specializing in providing essential oil products that combine many unique scents with diverse fragrances.
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">Products</h6>
            <p>
              <a href='/' className="text-decoration-none">Rose Essential Oil</a>
            </p>
            <p>
              <a href='/' className="text-decoration-none">Jasmine Essential Oil</a>
            </p>
            <p>
              <a  href='/' className="text-decoration-none">Green Apple Essential Oil</a>
            </p>
            <p>
              <a href='/' className="text-decoration-none">White Tea Essential Oil</a>
            </p>
          </div>

          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
            <p><FontAwesomeIcon icon={faHome} mr-3/> Khu đo thi FPT City, Ngu Hanh Son, Da Nang, Viet Nam</p>
            <p><FontAwesomeIcon icon={faEnvelope} mr-3/> tinhdaudepurete@gmail.com</p>
            <p><FontAwesomeIcon icon={faPhone} mr-3/> + 84 70 272 6839</p>
          </div>

          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">Follow us</h6>

            <a
               className="btn btn-primary btn-floating m-1"
               style={{backgroundColor: "#3b5998"}}
               href="https://www.facebook.com/tinhdaudepurete"
               role="button">
                {/* <FontAwesomeIcon icon={faFacebook} /> */}
                <i class="bi bi-facebook"></i>
            </a>
            <a
               className="btn btn-primary btn-floating m-1"
               style={{backgroundColor: "#ff6666"}}
               href="#!"
               role="button"
               >
                <i class="bi bi-instagram"></i>
            </a>
            <a
               className="btn btn-primary btn-floating m-1"
               style={{backgroundColor: ""}}
               href="#!"
               role="button"
               >
                <i class="bi bi-tiktok"></i>
            </a>

          </div>

        </Row>
      </Container>
    </footer>
  );
};
export default Footer;
