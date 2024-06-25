const API_ENDPOINT = 'https://api.example.com/dogs';
const API_KEY = 'live_MBhnj1K4V62Bp588Gf8EtwgyNG278RaniyHsRudr1YQKnedlH5CethDc9yaAVqGy';

export async function fetchDogs(page = 1, query = '') {
    let url = `${API_ENDPOINT}?page=${page}`;
    if (query) {
        url += `&q=${encodeURIComponent(query.trim())}`;
    }

    const response = await fetch(url, {
        headers: {
            'x-api-key': API_KEY
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    return data;
}

export async function saveDogDetails(dogData) {
    const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY
        },
        body: JSON.stringify(dogData)
    });

    if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
    }

    const savedDog = await response.json();
    return savedDog;
}