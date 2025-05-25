const menuToggle = document.getElementById('menuToggle');
        const hamburger = document.getElementById('hamburger');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');
        const mainContent = document.getElementById('mainContent');
        const projectsContainer = document.getElementById('projectsContainer');

        function toggleSidebar() {
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            if (window.innerWidth > 768) {
                mainContent.classList.toggle('shifted');
                projectsContainer.classList.toggle('shifted');
            }
        }

        menuToggle.addEventListener('click', toggleSidebar);
        
        overlay.addEventListener('click', () => {
            if (sidebar.classList.contains('active')) {
                toggleSidebar();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                mainContent.classList.remove('shifted');
                projectsContainer.classList.remove('shifted');
            } else if (sidebar.classList.contains('active')) {
                mainContent.classList.add('shifted');
                projectsContainer.classList.add('shifted');
            }
        });

        const sidebarItems = document.querySelectorAll('.sidebar li');
        sidebarItems.forEach(item => {
            item.addEventListener('click', () => {
                console.log('Clicked on:', item.textContent);
                
                if (window.innerWidth <= 768) {
                    toggleSidebar();
                }
            });
        });