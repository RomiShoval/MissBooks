export const googleBookService = {
    query
}


const MOCK_BOOKS = [
    {
        id: "1",
        volumeInfo: {
            title: "Effective JavaScript",
            subtitle: "68 Specific Ways to Harness the Power of JavaScript",
            authors: ["David Herman"],
            publishedDate: "2012",
            description: "JavaScript best practices guide.",
            pageCount: 230,
            categories: ["Programming"],
            imageLinks: { thumbnail: "https://via.placeholder.com/150" },
            language: "en",
        }
    },
    {
        id: "2",
        volumeInfo: {
            title: "You Don't Know JS",
            subtitle: "Scope & Closures",
            authors: ["Kyle Simpson"],
            publishedDate: "2014",
            description: "Deep dive into JavaScript scope and closures.",
            pageCount: 140,
            categories: ["Programming"],
            imageLinks: { thumbnail: "https://via.placeholder.com/150" },
            language: "en",
        }
    }
];

function query(txt) {
    console.log("Fetching books for:", txt);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(realQuery(txt));
        }, 500);
    });
}

async function realQuery(txt){
    const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${txt}`
    try{
        const respnse = await fetch(url)
        const data = await respnse.json()
        return data.items || []
    }
    catch(err){
        console.error("error fetching data :" , err)
        return []
    }
}