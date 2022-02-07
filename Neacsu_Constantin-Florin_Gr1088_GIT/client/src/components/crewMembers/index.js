import { useState, useEffect } from 'react'
import axios from 'axios'
import { Table, Form, Modal, Button } from 'react-bootstrap'

function CrewMembers() {

    const [crewMembers, setCrewMembers] = useState([]);
    const [crewMember, setCrewMember] = useState({
        name: '',
        role:'',
        movieId: 1
    });
    const [isModalOpen, showModal] = useState(false);
    const [isEditing, setEdit] = useState(false);
    const [count, setCount] = useState(0); // used to refetch data

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/getCrewMembers`)
            .then((response) => {
                setCrewMembers(response.data);
            }).catch((error) => {
                console.log(error);
            })
    }, [count]);

    const handleCloseModal = () => {
        setEdit(false);
        showModal(false);
    }

    const handleEdit = (crewMember) => {
        setCrewMember(crewMember);
        setEdit(true);
        showModal(true);
    }

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setCrewMember({...crewMember, [name]: value});
    }

    const saveCrewMember = () => {
        axios.put(`${process.env.REACT_APP_API_URL}/updateCrewMember/${crewMember.id}`, crewMember)
            .then((response) => {
                handleCloseModal();
                setCount(count + 1);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const addCrewMember = () => {
        axios.post(`${process.env.REACT_APP_API_URL}/addCrewMember`, crewMember)
            .then((response) => {
                setCrewMember({
                    name: '',
                    role: '',
                    movieId: 1
                });
                handleCloseModal();
                setCount(count + 1);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleDelete = (id) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/deleteCrewMember/${id}`)
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
            <Button variant="primary" onClick={() => showModal(true)}>Add CrewMember</Button>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <td>Role</td>
                        <td>Movie ID</td>
                        <td>Actions</td>
                    </tr>
                </thead>
            {
                crewMembers.map(crewMember => {
                    return (
                        <tr key={crewMember.id}>
                            <td>{crewMember.id}</td>
                            <td>{crewMember.name}</td>
                            <td>{crewMember.role}</td>
                            <td>{crewMember.movieId}</td>
                            <td>
                                <button onClick={() => handleEdit(crewMember)}>Edit</button>
                                <button onClick={() => handleDelete(crewMember.id)}>Delete</button>
                            </td>
                        </tr>
                    )
                })
            }
            </Table>
            <Modal show={isModalOpen} onHide={() => handleCloseModal()}>
                <Modal.Header closeButton>
                    <Modal.Title>
                    {isEditing ? `Editing CrewMember ID: ${crewMember.id}` : 'Adding new Crew Member'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Add name.." name="name" value={crewMember.name} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Control as="select" name="role" value={crewMember.role} onChange={handleInputChange}>
                            <option value="Directory" >Directory</option>
                            <option value="Management Directory">Management Directory</option>
                            <option value="Writer">Writer</option>
                            </Form.Control> 
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Movie ID</Form.Label>
                            <Form.Control type="text" placeholder="movieId" name="movieId" value={crewMember.movieId} onChange={handleInputChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {isEditing ? <Button variant="primary" onClick={saveCrewMember}>
                        Save CrewMember
                    </Button> : <Button variant="primary" onClick={addCrewMember}>
                        Add CrewMember
                    </Button>}
                </Modal.Footer>
            </Modal>
     </>
    )
}

export default CrewMembers;