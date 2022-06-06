import { useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Carousel } from 'react-responsive-carousel';
import { numberWithCommas } from '../utility/utility';

const Logement = props => {
	const [showModal, setShowModal] = useState(false);
	const handleClose = () => setShowModal(false);
	const handleShow = () => setShowModal(true);

	return (
		<>
			<div className="col-xl-4 col-sm-6 mb-4 px-1">
	            <div className="card h-100">
	              <div className={!/no_image.png$/.test(props.photos[0]) ? "pointer" : null} onClick={!/no_image.png$/.test(props.photos[0]) ? handleShow : null}><img className="card-img-top" src={props.photos[0]} alt={`${props.type} ${props.quartier} ${props.nombreDePieces} pièces`} /></div>
	              <div className="card-body">
	                <h5 className="card-title">
	                  Référence: {props.id}
	                </h5>
                	<ul className="card-text">
                		<li><b>Type:</b> {props.type}</li>
                		<li><b>Quartier:</b> {props.quartier}</li>
                		<li><b>Nombre de pièces:</b> {props.nombreDePieces}</li>
                		<li><b>Loyer:</b> {numberWithCommas(props.loyer)} Ar</li>
                	</ul>
                	<button disabled={/no_image.png$/.test(props.photos[0])} className="btn btn-primary btn-sm d-block mx-auto" onClick={handleShow}>Plus d'images</button>
	              </div>
	            </div>
	        </div>
			<Modal show={showModal} onHide={handleClose} size="lg">
		        <Modal.Header closeButton>
		          <Modal.Title>Référence: {props.id}</Modal.Title>
		        </Modal.Header>
		        <Modal.Body>
		        	<Carousel autoPlay={false}>
		        		{
		        			props.photos.map(photo => (
			        			<div key={photo}>
				                    <img src={photo} alt={`${props.type} ${props.quartier} ${props.nombreDePieces} pièces`} />
				                </div>
		        			))
		        		}
		            </Carousel>
		        </Modal.Body>
		    </Modal>
		</>
	);
};

export default Logement;