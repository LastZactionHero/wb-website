// Basic horizontal tab scrolling for Info Tabs component
// Scroll the Info Tabs container horizontally to the selected link
document.querySelectorAll('.info-tabs .tab-container .nav-link').forEach( (navLink) => {
  navLink.addEventListener('click', (event) => {
    let tabContainer = event.target.parentElement;
    while(!tabContainer.classList.contains('tab-container')) {
      tabContainer = tabContainer.parentElement;
    }
    tabContainer.scrollLeft = event.target.offsetLeft;
  });
})