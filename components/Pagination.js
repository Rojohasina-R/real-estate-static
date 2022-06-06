import Pagination from 'react-bootstrap/Pagination';

const CustomPagination = props => {
	const nombreDePages = Math.ceil(props.nombreDeLogements / props.nombreDeLogementsParPage);
	let items = [];
	for (let number = 1; number <= nombreDePages; number++) {
	  items.push(
	    <Pagination.Item 
	    	key={number} 
	    	active={number === props.currentPage}
	    	onClick={() => props.changePageHandler(number)}>
	      		{number}
	    </Pagination.Item>,
	  );
	}

	return (
		<Pagination className="justify-content-center">
			<Pagination.First 
				title="Première page"
				onClick={() => props.changePageHandler(1)}
				disabled={props.currentPage === 1} />
			<Pagination.Prev 
				title="Page précédente"
				onClick={() => props.changePageHandler(props.currentPage - 1)}
				disabled={props.currentPage === 1} />
			{items}
			<Pagination.Next
				title="Page suivante"
				onClick={() => props.changePageHandler(props.currentPage + 1)}
				disabled={props.currentPage === nombreDePages} />
			<Pagination.Last
				title="Dernière page"
				onClick={() => props.changePageHandler(nombreDePages)}
				disabled={props.currentPage === nombreDePages} />
		</Pagination>
	);
};

export default CustomPagination;