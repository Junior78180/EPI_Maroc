document.addEventListener('DOMContentLoaded', () => {
    const carouselSections = document.querySelectorAll('.carousel-section');

    if (carouselSections.length > 0) {
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                const currentPage = window.location.pathname.split('/').pop(); // e.g., "semaine1.html"
                const weekMatch = currentPage.match(/semaine(\d+)\.html/);

                if (weekMatch) {
                    const currentWeekNumber = parseInt(weekMatch[1]);
                    const weekData = data.weeks.find(w => w.week === currentWeekNumber);

                    if (weekData && weekData.images.length > 0) {
                        carouselSections.forEach(section => {
                            const carouselContainer = section.querySelector('.image-carousel');
                            if (carouselContainer) {
                                carouselContainer.innerHTML = ''; // Clear placeholder

                                let currentImageIndex = 0;

                                const displayImage = () => {
                                    carouselContainer.innerHTML = `
                                        <div class="carousel-item">
                                            <img src="${weekData.images[currentImageIndex]}" alt="Image Semaine ${currentWeekNumber}">
                                        </div>
                                        <div class="carousel-controls">
                                            <button class="prev-button">&lt;</button>
                                            <button class="next-button">&gt;</button>
                                        </div>
                                    `;

                                    const prevButton = carouselContainer.querySelector('.prev-button');
                                    const nextButton = carouselContainer.querySelector('.next-button');

                                    prevButton.addEventListener('click', () => {
                                        currentImageIndex = (currentImageIndex - 1 + weekData.images.length) % weekData.images.length;
                                        displayImage();
                                    });

                                    nextButton.addEventListener('click', () => {
                                        currentImageIndex = (currentImageIndex + 1) % weekData.images.length;
                                        displayImage();
                                    });
                                };

                                displayImage(); // Initial display
                            }
                        });
                    } else {
                        carouselSections.forEach(section => {
                            const carouselContainer = section.querySelector('.image-carousel');
                            if (carouselContainer) {
                                carouselContainer.innerHTML = '<p>Pas d\'images disponibles pour cette semaine.</p>';
                            }
                        });
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching or parsing data.json:', error);
                carouselSections.forEach(section => {
                    const carouselContainer = section.querySelector('.image-carousel');
                    if (carouselContainer) {
                        carouselContainer.innerHTML = '<p>Erreur de chargement des images.</p>';
                    }
                });
            });
    }
});
