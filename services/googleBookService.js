export const googleBookService = {
    query
}

async function query(searchTerm){
    const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${searchTerm}`
    try{
        const respnse = await fetch(url)
        const data = await respnse.json()

        if(!data) return

        return data.items.map(item =>({
                id: item.id,
                title: item.volumeInfo.title || "No Title",
                subtitle: item.volumeInfo.subtitle || "",
                authors: item.volumeInfo.authors || ["Unknown"],
                publishedDate: item.volumeInfo.publishedDate || "Unknown",
                description: item.volumeInfo.description || "No description available.",
                pageCount: item.volumeInfo.pageCount || 0,
                categories: item.volumeInfo.categories || ["General"],
                thumbnail: item.volumeInfo.imageLinks.thumbnail || "",
                language: item.volumeInfo.language || "Unknown",
                listPrice: {
                    amount: 0,
                    currencyCode: "USD",
                    isOnSale: "FOR_SALE"
                }
            })
        )} 
        catch(err){
            console.error("Error fetching from google API :" , err)
            return []
        }
}