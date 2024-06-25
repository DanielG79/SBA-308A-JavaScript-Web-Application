import { fetchDogs, saveDogDetails } from './api.js';
import { initUI, updateDogGrid, updatePagination } from './ui.js';

let currentPage = 1;
let searchQuery = '';

async function loadDogs(page = 1, query = '') {
    try {
        const dogs = await fetchDogs(page, query);
        updateDogGrid(dogs);
        updatePagination(page, dogs.totalPages);
    } catch (error) {
        console.error('Error fetching dogs:', error);
    }
}

async function handleDogFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const dogData = {
        breed: formData.get('breed'),
        age: parseInt(formData.get('age')),
        size: formData.get('size')
    };

    try {
        const savedDog = await saveDogDetails(dogData);
        console.log('Dog saved:', savedDog);
        event.target.reset();
    } catch (error) {
        console.error('Error saving dog:', error);
    }
}

function handlePageChange(direction) {
    if (direction === 'prev' && currentPage > 1) {
        currentPage--;
    } else if (direction === 'next' && currentPage < 10) { // Assuming a maximum of 10 pages
        currentPage++;
    }
    loadDogs(currentPage, searchQuery);
}

function handleSearch() {
    const searchInput = document.getElementById('search-input');
    searchQuery = searchInput.value.trim();
    loadDogs(1, searchQuery);
}

document.addEventListener('DOMContentLoaded', () => {
    initUI();
    loadDogs();

    document.getElementById('dog-form').addEventListener('submit', handleDogFormSubmit);
    document.getElementById('prev-page').addEventListener('click', () => handlePageChange('prev'));
    document.getElementById('next-page').addEventListener('click', () => handlePageChange('next'));
    document.getElementById('search-button').addEventListener('click', handleSearch);
});
