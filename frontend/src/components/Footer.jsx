import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import icon_shopee from '../assets/images/icon-shopee.jpg'
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='' style={{boxShadow:"10px 10px 10px 5px rgba(0, 0, 0, 0.75)"}}>
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
              <a href='/' className="text-decoration-none">Home Vibe Essential Oil</a>
            </p>
            <p>
              <a href='/' className="text-decoration-none">The Youth Essential Oil</a>
            </p>
            <p>
              <a  href='/' className="text-decoration-none">Junia Essential Oil</a>
            </p>
            <p>
              <a href='/' className="text-decoration-none">Muse Essential Oil</a>
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
               className="btn btn-primary btn-floating"
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

            {/* <a
               className="btn btn-primary btn-floating m-1"
               style={{backgroundColor: ""}}
               href="https://shopee.vn/"
               role="button"
               > */}
               <a href="https://shopee.vn/">

                <img src={icon_shopee} alt='shopee' className="" style={{height:"45px", borderRadius:"10%", border:"solid 1px #333"}}/>
               </a>
            {/* </a> */}

          </div>

        </Row>
      </Container>
    </footer>
  );
};
export default Footer;
