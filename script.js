document.addEventListener('DOMContentLoaded', () => {

    let closedMenu = document.querySelector('.fa-bars');
    let openMenu = document.querySelector('.fa-xmark');
    let sideNavBar = document.querySelector('.navBarforSmallerScreens');
    let navLinks = document.querySelectorAll('.navEl'); // Keep the nav links reference outside the event

    closedMenu.addEventListener('click', () => {
        closedMenu.style.display = 'none';
        openMenu.style.display = 'inline-block';

        let sideMenu = document.createElement('div');
        sideMenu.classList.add('sideMenu');
        sideNavBar.append(sideMenu);

        // Move all nav elements into the side menu
        navLinks.forEach(link => {
            // Remove right margin from nav links when in smaller screens
            link.style.marginRight = 0;
            link.classList.add('navLinkForSmallerScreens');
            sideMenu.appendChild(link);
        });

        // Activate the side menu with a smooth transition
        setTimeout(() => {
            sideMenu.classList.add('active');
        }, 10);
    });

    openMenu.addEventListener('click', () => {
        openMenu.style.display = 'none';
        closedMenu.style.display = 'inline-block';

        let sideMenu = document.querySelector('.sideMenu');
        if (sideMenu) {
            // Remove the active class for the smooth closing transition
            sideMenu.classList.remove('active');

            setTimeout(() =>{
                sideMenu.remove();
            }, 300)
        }
    });

});
