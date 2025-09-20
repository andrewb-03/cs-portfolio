/**
 * @file Home.js
 * @summary Renders the landing page with a user search feature that queries the backend by name or ID.  
 * Uses a basic similarity scoring algorithm to rank and sort results before displaying them.  
 * Fetches initial backend status and conditionally shows matched users after a search is triggered.
 */

// Home.js
import React from 'react';
//import AuthGate from '../../../components/AuthGate';

// Simple similarity function
function getSimilarity(a, b) {
    if (!a || !b) return 0;
    a = a.toLowerCase();
    b = b.toLowerCase();
    if (a === b) return 1;
    let matches = 0;
    for (let i = 0; i < Math.min(a.length, b.length); i++) {
        if (a[i] === b[i]) matches++;
    }
    return matches / Math.max(a.length, b.length);
}

// This is the homepage component for the application.
// It fetches data from the backend and allows users to search for other users.
// The search functionality queries the backend for users based on the input query.
function Home() {
    // State variables to manage the search query and results
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [searched, setSearched] = useState(false);

    useEffect(() => {
        fetch('http://3.145.95.194:5000/api/test')
            .then(res => res.json())
            .then(data => console.log(data));
    }, []);

    // Function to handle the search form submission
    // It prevents the default form submission behavior, checks if the query is not empty,
    const handleSearch = async (e) => {
        // and then fetches the search results from the backend.
        // The results are then stored in the state variable 'results'.
        e.preventDefault();
        setSearched(true);
        if (!query.trim()) {
            setResults([]);
            return;
        }
        const res = await fetch(`http://3.145.95.194:5000/api/users/search?q=${encodeURIComponent(query)}`);
        let data = await res.json();
        data = data.map(user => ({
            ...user,
            similarity: Math.max(
                getSimilarity(user.name, query),
                getSimilarity(String(user.id), query)
            )
        }));
        data.sort((a, b) => b.similarity - a.similarity);
        setResults(data);
    };

    // Render the component
    
    return (
        <div>
            <h1>Check if your friends are making lemonade with us</h1>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Enter user id or name"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    className="search-bar"
                />
                <button type="submit">Search</button>
            </form>
            {searched && (
                <div>
                    <p>
                        {results.length === 0
                            ? "No users found."
                            : `${results.length} user(s) found.`}
                    </p>
                </div>
            )}
            <ul>
                {/* comments are written like this because this is JSX
                    Display the search results
                    Each user is displayed with their name and email.
                    The key for each list item is the user's ID to ensure uniqueness. */}
                {results.map(user => (
                    <li key={user.id} style={{ marginBottom: "1rem" }}>
                        <strong>Name:</strong> {user.name} <br />
                        <strong>Email:</strong> {user.email} <br />
                        {user.similarity !== undefined && (
                            <span>
                                <strong>Similarity:</strong> {(user.similarity * 100).toFixed(0)}%
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}



export default Home;
