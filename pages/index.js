import Layout from "../components/Layout";
import Logement from '../components/Logement';
import Filter from '../components/Filter';
import { useState, useCallback } from "react";
import Pagination from "../components/Pagination";
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Newsletter from '../components/Newsletter';

const Home = ({logements}) => {
  const [state, setState] = useState(logements);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('idDécroissant');

  const filterHandler = useCallback((type, nombreDePiècesMinimum, maxLoyer, quartiers) => {
    setCurrentPage(1);
    const filteredState = logements.filter(logement => {
      return ((type ? logement.type == type : true) && (quartiers.trim() ? quartiers.trim().toLowerCase().split(' ').filter(quartier => quartier !== '').some(quartier => logement.quartier.toLowerCase().includes(quartier)) : true) && (nombreDePiècesMinimum ? logement.nombreDePieces >= nombreDePiècesMinimum : true) && (maxLoyer ? parseInt(logement.loyer, 10) <= parseInt(maxLoyer, 10) : true));
    });
    if(sortBy === 'idDécroissant')
      setState(filteredState);
    else if(sortBy === 'idCroissant')
      setState(filteredState.sort((a, b) => a.id - b.id));
    else if(sortBy === 'nombreDePiècesDécroissant')
      setState(filteredState.sort((a, b) => b.nombreDePieces - a.nombreDePieces));
    else if(sortBy === 'nombreDePiècesCroissant')
      setState(filteredState.sort((a, b) => a.nombreDePieces - b.nombreDePieces));
    else if(sortBy === 'loyerDécroissant')
      setState(filteredState.sort((a, b) => b.loyer - a.loyer));
    else if(sortBy === 'loyerCroissant')
      setState(filteredState.sort((a, b) => a.loyer - b.loyer));
  }, [sortBy]);

  const sortHandler = useCallback(event => {
    setSortBy(event.target.value);
    setCurrentPage(1);
    const sortedState = [...state];
    if(event.target.value === 'idDécroissant')
      setState(sortedState.sort((a, b) => b.id - a.id));
    else if(event.target.value === 'idCroissant')
      setState(sortedState.sort((a, b) => a.id - b.id));
    else if(event.target.value === 'nombreDePiècesDécroissant')
      setState(sortedState.sort((a, b) => b.nombreDePieces - a.nombreDePieces));
    else if(event.target.value === 'nombreDePiècesCroissant')
      setState(sortedState.sort((a, b) => a.nombreDePieces - b.nombreDePieces));
    else if(event.target.value === 'loyerDécroissant')
      setState(sortedState.sort((a, b) => b.loyer - a.loyer));
    else if(event.target.value === 'loyerCroissant')
      setState(sortedState.sort((a, b) => a.loyer - b.loyer));
  }, [state]);

  const changePageHandler = pageNumber => setCurrentPage(pageNumber);

  //get information about the current page
  const nombreDeLogementsParPage = 6;
  const lastItemIndex = currentPage * nombreDeLogementsParPage;
  const firstItemIndex = lastItemIndex - nombreDeLogementsParPage;

	return (
		<Layout>
      <Jumbotron fluid className="mb-0">
        <Container>
          <h1>Qui sommes-nous?</h1>
          <p className="text-justify">
            Nous sommes une petite équipe de jeunes passionnés par les nouvelles technologies, et notamment le web.
          </p>
          <h2>Notre mission?</h2>
          <p className="text-justify">
          	Permettre à la bonne offre et à la bonne demande de se rencontrer.
          </p>
        </Container>
      </Jumbotron>
      <Row className="mx-0">
        <Col xl="3" md="4" className="px-0">
          <Filter filterHandler={filterHandler} sortHandler={sortHandler} sortBy={sortBy} />
          <div className="d-none d-md-block">
            <Newsletter />
          </div>
        </Col>
        <Col xl="9" md="8">
          <div className="py-3">{state.length} logement{state.length > 1 && 's'} trouvé{state.length > 1 && 's'}</div>
          <Row>
            {
              state.slice(firstItemIndex, lastItemIndex).map(logement => (
                <Logement key={logement.id} {...logement} />
              ))
            }
          </Row>
          {
            state.length > 0 &&
              <Pagination 
                nombreDeLogements={state.length} 
                currentPage={currentPage}
                changePageHandler={changePageHandler}
                nombreDeLogementsParPage={nombreDeLogementsParPage} />
          }
        </Col>
      </Row>
      <div className="d-md-none d-block">
        <Newsletter />
      </div>
		</Layout>
	);
};

export async function getServerSideProps() {
  /*const res = await fetch('http://127.0.0.1:8000/api/logements', {
    headers: {
      "Authorization": "Bearer P8ThZ7i3oSJnoXqG1aBd3cJD4Cv51fEbswPIuu7y"
    }
  });
  const logements = await res.json();*/

  return {
    props: {
      /*logements: logements.data*/
      logements: [{"id":35,"type":"Maison","nombreDePieces":"2","quartier":"Alarobia","loyer":"200000","photos":["./img/simpson.webp","./img/simpson.webp","./img/simpson.webp"]},{"id":33,"type":"Appartement","nombreDePieces":"2","quartier":"analamahitsy","loyer":"200000","photos":["./img/simpson.webp"]},{"id":32,"type":"Maison","nombreDePieces":"3","quartier":"Ankazotokana","loyer":"250000","photos":["./img/no_image.png"]},{"id":30,"type":"Appartement","nombreDePieces":"2","quartier":"Alarobia","loyer":"290000","photos":["./img/no_image.png"]},{"id":29,"type":"Maison","nombreDePieces":"3","quartier":"Ampasika","loyer":"200000","photos":["./img/no_image.png"]},{"id":28,"type":"Appartement","nombreDePieces":"2","quartier":"Mahabibo","loyer":"150000","photos":["./img/no_image.png"]},{"id":26,"type":"Maison","nombreDePieces":"2","quartier":"Itaosy","loyer":"200000","photos":["./img/no_image.png"]},{"id":25,"type":"Maison","nombreDePieces":"3","quartier":"Mahamasina","loyer":"500000","photos":["./img/no_image.png"]},{"id":1,"type":"Appartement","nombreDePieces":"2","quartier":"Tsaralalàna","loyer":"500000","photos":["./img/no_image.png"]}]
    }
  };
};

export default Home;
