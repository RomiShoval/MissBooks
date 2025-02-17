import '../assets/style/cmps/BookFilter.css';
const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM



export function BookFilter({ filterBy, onSetFilter }) {

    const[filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const [searchParams, setSearchParams] = useSearchParams()
    

    const categories = ["All", "Computers", "Hack", "Fiction", "Science", "History"];
    const languages = ["All", "en", "sp", "he", "fr"];

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    useEffect(() => {
        setFilterByToEdit({
            title: searchParams.get("title") || "",
            minPrice: searchParams.get("minPrice") || "",
            maxPrice: searchParams.get("maxPrice") || "",
            category: searchParams.get("category") || null,
            language: searchParams.get("language") || null,
        });
    }, [searchParams]);


    
    function handleChange({ target }) {
        let { name : field, value,type,checked } = target
        if(type === 'number'){
            value = Number(value) || 0
        }
        if(type === 'checkbox'){
            value = checked
        }
        if(field === 'category' && value === 'All') value = null
        if(field === 'language' && value === 'All') value = null
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

