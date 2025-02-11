import '../assets/style/cmps/BookFilter.css';
const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function BookFilter({ filterBy, onSetFilter }) {

    const[filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    const categories = ["All", "Computers", "Hack", "Fiction", "Science", "History"];
    const languages = ["All", "en", "sp", "he", "fr"];

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])
    
    function handleChange({ target }) {
        let { name : field, value,type,checked } = target
        if(target.type === 'number'){
            value = Number(value) || 0
        }
        if(type === 'checkbox'){
            value = checked
        }
        if(name === 'category' && value === 'All') value = null
        if(name === 'language' && value === 'All') value = null
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    return (
        <div className="book-filter-container">
            <input 
                type="text"
                name="title" 
                placeholder="🔎 Search by title" 
                value={filterByToEdit.title} 
                onChange={handleChange} />
            <input 
                type="number" 
                name="minPrice" 
                placeholder="Min price" 
                value={filterByToEdit.minPrice} 
                onChange={handleChange} />
            <input 
                type="number" 
                name="maxPrice" 
                placeholder="Max price" 
                value={filterByToEdit.maxPrice} 
                onChange={handleChange} />
            <select 
                name="category" value={filterByToEdit.category} onChange={handleChange}>
                {categories.map(category => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>

            <select name="language" value={filterByToEdit.language} onChange={handleChange}>
                {languages.map(language => (
                    <option key={language} value={language}>
                        {language}
                    </option>
                ))}
            </select>
        </div>
    );
}

