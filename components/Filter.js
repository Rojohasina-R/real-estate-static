import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { useState, useEffect } from "react";
import { numberWithCommas } from '../utility/utility';
import { FaMapMarkerAlt } from "react-icons/fa";
import debounce from 'lodash/debounce';

const Filter = React.memo(props => {
	const [nombreDePiècesMinimum, setNombreDePiècesMinimum] = useState('');
	const [type, setType] = useState('');
	const [maxLoyer, setMaxLoyer] = useState(2000000);
	const [quartiers, setQuartiers] = useState('');

	useEffect(() => {
		props.filterHandler(type, nombreDePiècesMinimum, maxLoyer, quartiers);
	}, [quartiers]);

	const onChangeHandler = event => {
		debouncedChangeHandler(event.target.value);
	};

	const debouncedChangeHandler = debounce(value => setQuartiers(value), 300);

	const reset = () => {
		setNombreDePiècesMinimum('');
		setType('');
		setMaxLoyer(2000000);
	};

	const generalFilterHandler = event => {
		event.preventDefault();
		props.filterHandler(type, nombreDePiècesMinimum, maxLoyer, quartiers);
	};

	return (
		<div className="bg-light p-3" id="filter">
			<h4 className="text-dark">Filtre</h4>
			<Form onSubmit={generalFilterHandler}>
				<Row>
					<Form.Group controlId="type" className="col-12">
					    <Form.Control 
					    	as="select" 
					    	onChange={event => setType(event.target.value)}
					    	value={type}
					    	custom>
						      <option value="">Type</option>
						      <option value="Appartement">Appartement</option>
						      <option value="Maison">Maison</option>
					    </Form.Control>
					</Form.Group>
					<Form.Group controlId="nombreDePiècesMinimum" className="col-12">
					    <Form.Control 
					    	as="select" 
					    	onChange={event => setNombreDePiècesMinimum(event.target.value)}
					    	value={nombreDePiècesMinimum}
					    	custom>
						      <option value="">Nombre de pièces minimum</option>
						      <option value="1">1</option>
						      <option value="2">2</option>
						      <option value="3">3</option>
						      <option value="4">4</option>
						      <option value="5">5</option>
					    </Form.Control>
					</Form.Group>
					<Form.Group controlId="maxLoyer" className="col-12">
					    <Form.Label>
					    	<span className="d-inline-block mr-1">Loyer maximum:</span>
					    	<span className="d-inline-block">
					    		{numberWithCommas(maxLoyer)} Ar
					    	</span>
					    </Form.Label>
					    <Form.Control 
					    	type="range" 
					    	custom
					    	min="100000" 
					    	max="2000000" 
					    	step="100000"
					    	value={maxLoyer}
					    	onChange={event => setMaxLoyer(event.target.value)} />
					</Form.Group>
					<Col xs="12" className="form-group">
						<Button variant="primary" type="submit" className="mr-2 mb-1">
						    Rechercher
						</Button>
						<Button className="mb-1" variant="danger" type="button" onClick={reset}>
						    Réinitialiser
						</Button>
					</Col>
					<InputGroup className="mb-2 col-12">
				        <InputGroup.Prepend>
				          <InputGroup.Text><FaMapMarkerAlt /></InputGroup.Text>
				        </InputGroup.Prepend>
				        <FormControl 
				        	placeholder="Quartier(s)"
				        	onChange={onChangeHandler} />
				        <Form.Text className="text-muted">
					    	Vous pouvez entrer plusieurs quartiers séparés par des espaces.
					    </Form.Text>
				    </InputGroup>
				    <Form.Group controlId="sortBy" className="col-12 mt-2">
				      <Form.Label>Trier par</Form.Label>
				      <Form.Control 
				        as="select" 
				        onChange={props.sortHandler}
				        value={props.sortBy}
				        custom>
				          <option value="idDécroissant">Référence &#x21E9;</option>
				          <option value="idCroissant">Référence &#x21E7;</option>
				          <option value="nombreDePiècesDécroissant">Nombre de pièces &#x21E9;</option>
				          <option value="nombreDePiècesCroissant">Nombre de pièces &#x21E7;</option>
				          <option value="loyerDécroissant">Loyer &#x21E9;</option>
				          <option value="loyerCroissant">Loyer &#x21E7;</option>
				      </Form.Control>
				    </Form.Group>
				</Row>
			</Form>
		</div>
	);
});

export default Filter;