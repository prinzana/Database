


    // Modal functionality
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modal = document.getElementById('editModal');

    openModalBtn.addEventListener('click', function() {
        modal.style.display = 'flex'; // Use 'flex' to center the modal
    });

    closeModalBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };






    document.addEventListener('DOMContentLoaded', function () {
        // Ensure elements are present before adding event listeners
        const menuToggle = document.getElementById('menu-toggle');
        const navLinks = document.getElementById('nav-links');
    
        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', function () {
                navLinks.classList.toggle('active');
            });
        }
    
        // Modal functionality
        const openModalBtn = document.getElementById('openModalBtn');
        const closeModalBtn = document.getElementById('closeModalBtn');
        const modal = document.getElementById('editModal');
    
        if (openModalBtn && closeModalBtn && modal) {
            openModalBtn.addEventListener('click', function () {
                modal.style.display = 'block';
            });
    
            closeModalBtn.addEventListener('click', function () {
                modal.style.display = 'none';
            });
    
            // Close the modal when clicking outside the modal content
            window.addEventListener('click', function (event) {
                if (event.target == modal) {
                    modal.style.display = 'none';
                }
            });
        }
    });
    













/* 
// JavaScript for sidebar functionality
document.getElementById('menu-toggle').addEventListener('click', function() {
    document.getElementById('sidebar').style.width = '250px'; // Adjust width as needed
});

document.getElementById('close-sidebar').addEventListener('click', function() {
    document.getElementById('sidebar').style.width = '0';
});

// JavaScript for modal functionality
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const modal = document.getElementById('editModal');

openModalBtn.addEventListener('click', function() {
    modal.style.display = 'block';
});

closeModalBtn.addEventListener('click', function() {
    modal.style.display = 'none';
});

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};*/