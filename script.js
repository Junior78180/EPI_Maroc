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

                                // Create initial structure once
                                const carouselItem = document.createElement('div');
                                carouselItem.classList.add('carousel-item');
                                const imgElement = document.createElement('img');
                                imgElement.alt = `Image Semaine ${currentWeekNumber}`;
                                carouselItem.appendChild(imgElement);

                                const carouselControls = document.createElement('div');
                                carouselControls.classList.add('carousel-controls');
                                const prevButton = document.createElement('button');
                                prevButton.classList.add('prev-button');
                                prevButton.innerHTML = '&lt;';
                                const nextButton = document.createElement('button');
                                nextButton.classList.add('next-button');
                                nextButton.innerHTML = '&gt;';
                                carouselControls.appendChild(prevButton);
                                carouselControls.appendChild(nextButton);

                                carouselContainer.appendChild(carouselItem);
                                carouselContainer.appendChild(carouselControls);

                                const displayImage = () => {
                                    imgElement.src = weekData.images[currentImageIndex];
                                };

                                prevButton.addEventListener('click', () => {
                                    currentImageIndex = (currentImageIndex - 1 + weekData.images.length) % weekData.images.length;
                                    displayImage();
                                });

                                nextButton.addEventListener('click', () => {
                                    currentImageIndex = (currentImageIndex + 1) % weekData.images.length;
                                    displayImage();
                                });

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