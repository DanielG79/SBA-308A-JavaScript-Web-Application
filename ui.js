export function initUI() {
    const dogGrid = document.getElementById('dog-grid');
    const currentPageElement = document.getElementById('current-page');

    // Clear the dog grid
    dogGrid.innerHTML = '';
}

export function updateDogGrid(dogs) {
    const dogGrid = document.getElementById('dog-grid');

    // Clear the dog grid
    dogGrid.innerHTML = '';

    dogs.data.forEach(dog => {
        const dogCard = document.createElement('div');
        dogCard.classList.add('col', 'dog-card');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const dogImage = document.createElement('img');
        dogImage.src = dog.imageUrl;
        dogImage.alt = dog.name;

        const dogName = document.createElement('h3');
        dogName.textContent = dog.name;

        const dogBreed = document.createElement('p');
        dogBreed.textContent = dog.breed;

        cardBody.appendChild(dogName);
        cardBody.appendChild(dogBreed);

        dogCard.appendChild(dogImage);
        dogCard.appendChild(cardBody);

        dogGrid.appendChild(dogCard);
    });
}

export function updatePagination(currentPage, totalPages) {
    const currentPageElement = document.getElementById('current-page');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');

    currentPageElement.textContent = currentPage;

    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage === totalPages;
}

export async function fetchDogs(page = 1, query = '') {
    let url = `${API_ENDPOINT}?page=${page}`;
    if (query.trim() !== '') {
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

