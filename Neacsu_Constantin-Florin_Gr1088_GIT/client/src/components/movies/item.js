function MovieItem({ data }) {
    return (
        <tr>
            <td>{data.id}</td>
            <td>{data.titlu}</td>
            <td>{data.categorie}</td>
            <td>{data.data_publicarii}</td>
            <td>
                <button>Edit</button>
                <button>Delete</button>
            </td>
        </tr>
    )
}

export default MovieItem;