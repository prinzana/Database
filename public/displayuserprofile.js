
        
        const menuToggle = document.getElementById('menu-toggle');
        const closeMenu = document.getElementById('close-menu');
        const navLinks = document.querySelector('.nav-links');
        
        // Function to open the mobile menu
        function openMenu() {
            navLinks.classList.add('show');
            closeMenu.style.display = 'block'; // Show close button
        }
        
        // Function to close the mobile menu
        function closeMenuFunc() {
            navLinks.classList.remove('show');
            closeMenu.style.display = 'none'; // Hide close button
        }
        
        menuToggle.addEventListener('click', openMenu);
        closeMenu.addEventListener('click', closeMenuFunc);
        
        // Close the menu when clicking outside of it
        document.addEventListener('click', function(event) {
            if (!navLinks.contains(event.target) && event.target !== menuToggle) {
                closeMenuFunc();
            }
        });
    
   
        