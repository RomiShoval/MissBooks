import '../assets/style/cmps/BookFilter.css';
const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function BookFilter({ filterBy, onSetFilter }) {

    const[filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])
    
    function handleChange({ target }) {
        let { name : field, value } = target
        if(target.type === 'number'){
            value = Number(value) || 0
        }
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    return (
        <div className="book-filter">
            <input type="text" name="title" placeholder="Search by title" value={filterByToEdit.title} onChange={handleChange} />
            <input type="number" name="minPrice" placeholder="Min price" value={filterByToEdit.minPrice} onChange={handleChange} />
            <input type="number" name="maxPrice" placeholder="Max price" value={filterByToEdit.maxPrice} onChange={handleChange} />
        </div>
    );
}

