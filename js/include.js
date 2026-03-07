/**
 * Utility to include header and footer components
 */
document.addEventListener("DOMContentLoaded", function() {
    // Function to load external HTML into a placeholder
    function loadComponent(id, url, callback) {
        const placeholder = document.getElementById(id);
        if (placeholder) {
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                })
                .then(data => {
                    placeholder.innerHTML = data;
                    if (callback) callback();
                    updateActiveLink(); // Update active link after header/footer is loaded
                })
                .catch(error => {
                    console.error('Error loading component:', error);
                });
        }
    }

    // Load Header and Footer
    loadComponent('header-placeholder', 'components/header.html', function() {
        // Initialize menu toggle after header is loaded (if necessary)
        // Note: The original scripts.js might already handle this, but if it doesn't work, we'll need to re-init.
    });
    
    loadComponent('footer-placeholder', 'components/footer.html', function() {
        // Update current year in footer
        const yearSpan = document.getElementById('current-year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    });

    // Handle Active Link logic
    function updateActiveLink() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.menu li a, .mobile-menu li a');
        
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            const parentLi = link.closest('li');
            
            if (linkPath === currentPath) {
                parentLi.classList.add('current-menu-item');
                // Also add to ancestors if needed
                let parent = parentLi.parentElement.closest('li');
                while (parent) {
                    parent.classList.add('current-menu-ancestor');
                    parent = parent.parentElement.closest('li');
                }
            } else {
                parentLi.classList.remove('current-menu-item');
            }
        });
    }
});
