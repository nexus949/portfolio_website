document.addEventListener('DOMContentLoaded', () => {

    let closedMenu = document.querySelector('.fa-bars-staggered');
    let openMenu = document.querySelector('.fa-xmark');
    let navBar = document.querySelector('.navBar');
    let navLinks = document.querySelectorAll('.navEl');
    let sideMenu;
    let isSideMenuOpen = false;

    function createSideMenu(){
        let sideMenu = document.createElement('div');
        sideMenu.classList.add('sideMenu');
        navBar.append(sideMenu);
        return sideMenu;
    }

    function addSideMenu(){
        navLinks.forEach(link =>{
            // Remove right margin from nav links when in smaller screens
            link.style.marginRight = 0;

            link.classList.add('navLinkForSmallerScreens');
            sideMenu.appendChild(link);
            isSideMenuOpen = true;
        })
    }

    function removeSideMenu(){
        // Remove the active class for the smooth closing transition
        sideMenu.classList.remove('active');

        //return the navLinks to the origin navLink container (navOptions)
        setTimeout(() => {
            let navOptions = document.querySelector('.navOptions');
            navLinks.forEach(link => {
                link.classList.remove('navLinkForSmallerScreens');
                navOptions.appendChild(link);
            });

            sideMenu.remove();
        }, 300);

        isSideMenuOpen = false;
    }

    closedMenu.addEventListener('click', () => {
        closedMenu.style.display = 'none';
        openMenu.style.display = 'inline-block';

        sideMenu = createSideMenu();
        addOverlay();
        addSideMenu();

        // Activate the side menu with a smooth transition
        setTimeout(() => {
            sideMenu.classList.add('active');
        }, 10);
    });

    openMenu.addEventListener('click', () => {
        openMenu.style.display = 'none';
        closedMenu.style.display = 'inline-block';

        removeOverlay();

        let sideMenu = document.querySelector('.sideMenu');
        if (sideMenu) {
            removeSideMenu();
    
            //remove the sideMenu
            setTimeout(() => {
                sideMenu.remove();
            }, 300)
        }
    });

    //this function removes the sideBar when navigated to a section
    function moveToSectionAndRemove(){
        if(isSideMenuOpen){
            removeSideMenu(); 
            removeOverlay(); 
            openMenu.style.display = 'none'; 
            closedMenu.style.display = 'inline-block';
        }
    }
    navLinks.forEach(link =>{
        link.addEventListener('click', () =>{
            moveToSectionAndRemove();
        })
    })

    //overlay functions
    let overlay = document.createElement('div');
    overlay.classList.add('overlay');

    function addOverlay(){    
        document.body.appendChild(overlay);
    }

    function removeOverlay(){
        let overlay = document.querySelector('.overlay');
        overlay.remove();
    }

    overlay.addEventListener('click', () => {
        openMenu.style.display = 'none';
        closedMenu.style.display = 'inline-block';
        removeSideMenu();
        removeOverlay();
    })

    function checkScreenSize(){
        if (window.innerWidth >= 768 && isSideMenuOpen){ 
            openMenu.style.display = 'none'; 
            closedMenu.style.display = 'inline-block'; 
            removeSideMenu(); 
            removeOverlay(); 
        }
    }

    window.addEventListener('resize', checkScreenSize);

    //darkmode code
    let darkModeButton = document.querySelector('.modeButton');
    let currentMode = 'light';

    let onLightBulb = document.querySelector('.on-lightbulb');
    let offLightBulb = document.querySelector('.off-lightbulb');

    darkModeButton.addEventListener('click', () =>{
        if(currentMode === 'light'){
            onLightBulb.style.display = 'inline-block';
            offLightBulb.style.display = 'none';
            currentMode = 'dark';
        }
        else{
            onLightBulb.style.display = 'none';
            offLightBulb.style.display = 'inline-block';
            currentMode = 'light';
        }

        document.body.classList.toggle('dark-mode');
    });
});