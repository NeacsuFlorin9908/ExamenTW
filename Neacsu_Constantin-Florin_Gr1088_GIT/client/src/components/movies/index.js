import { useState, useEffect } from 'react'
import axios from 'axios'
import { Table, Button, Modal, Form } from 'react-bootstrap'

function Movies() {

    const [movies, setMovies] = useState([]);
    const [movie, setMovie] = useState({
        titlu: '',
        categorie: '',
        data_publicarii: '',
    });
    const [searchText, setSearchText] = useState('');
    const [isModalOpen, showModal] = useState(false);
    const [isEditing, setEdit] = useState(false);
    const [sorting, setSorting] = useState('ASC');
    const [count, setCount] = useState(0); // used to refetch data

    useEffect(() => {
        if (searchText.length > 0) {
            axios.get(`${process.env.REACT_APP_API_URL}/searchMovie?searchTerm=${searchText}`).then((response) => {
                setMovies(response.data);
            }, (error) => {
                console.log(error);
            })
        } else {
            axios.get(`${process.env.REACT_APP_API_URL}/getMovies`).then((response) => {
                setMovies(response.data);
            }, (error) => {
                console.log(error);
            })
        }
    }, [count, searchText]);

    useEffect(() => {
        if (searchText.length > 0) {
            axios.get(`${process.env.REACT_APP_API_URL}/searchMovies?searchTerm=${searchText}&order=${sorting}`).then((response) => {
                setMovies(response.data);
            }, (error) => {
                console.log(error);
            })
        }
    }, [sorting, searchText]) //when sorting (asc, desc) changes

    const handleCloseModal = () => {
        setEdit(false);
        showModal(false);
    }

    const handleEdit = (movie) => {
        setMovie(movie);
        setEdit(true);
        showModal(true);
    }

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setMovie({...movie, [name]: value});
    }

    const saveMovie = () => {
        axios.put(`${process.env.REACT_APP_API_URL}/updateMovie/${movie.id}`, movie)
            .then((response) => {
                handleCloseModal();
                setCount(count + 1);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const addMovie = () => {
        axios.post(`${process.env.REACT_APP_API_URL}/addMovie`, movie)
            .then((response) => {
                setMovie({
                    titlu: '',
                    categorie: '',
                    data_publicarii: '',
                });
                handleCloseModal();
                setCount(count + 1);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleDelete = (id) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/deleteMovie/${id}`)
            .then((response) => {
                handleCloseModal();
                setCount(count + 1);
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <>
            <Button variant="primary" onClick={() => showModal(true)}>Add Movie</Button>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Search..." value={ searchText } onChange={(e) => setSearchText(e.target.value)} />
                </Form.Group>
                <Form.Group>    
                    <Form.Control as="select" value={sorting} onChange={e => {
                        setSorting(e.target.value)
                    }}>
                        <option value="ASC">Crescator</option>
                        <option value="DESC">Descrescator</option>
                    </Form.Control>
                </Form.Group>
            </Form>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Titlu</th>
                        <td>Categorie</td>
                        <td>Data Publicarii</td>
                        <td>Actions</td>
                    </tr>
                </thead>
            {
                 movies.map( movie => {
                    return (
                        <tr key={ movie.id}>
                            <td>{ movie.id}</td>
                            <td>{ movie.titlu}</td>
                            <td>{ movie.categorie}</td>
                            <td>{ movie.data_publicarii}</td>
                            <td>
                                <button onClick={() => handleEdit( movie)}>Edit</button>
                                <button onClick={() => handleDelete( movie.id)}>Delete</button>
                            </td>
                        </tr>
                    )
                })
            }
            </Table>
            <Modal show={isModalOpen} onHide={() => handleCloseModal()}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {isEditing ? `Editing Movie ID: ${movie.id}` : 'Adding new movie'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Titlu</Form.Label>
                            <Form.Control type="text" placeholder="Adauga titlu.." name="titlu" value={movie.titlu} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Categorie</Form.Label>
                            <Form.Control type="text" placeholder="Adauga categorie..." name="categorie" value={movie.categorie} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Data Publicarii</Form.Label>
                            <Form.Control type="text" placeholder="Adauga data publicarii.." name="data_publicarii" value={movie.data_publicarii} onChange={handleInputChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>








                <Modal.Footer>
                    {isEditing ? <Button variant="primary" onClick={saveMovie}>
                        Save Movie
                    </Button> : <Button variant="primary" onClick={addMovie}>
                        Add Movie
                    </Button>}
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Movies;