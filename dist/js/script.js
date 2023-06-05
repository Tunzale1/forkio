document.addEventListener('DOMContentLoaded', function () {
    // Toggle the navbar menu on mobile devices
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarMenu = document.querySelector('.ul');
    navbarToggle.addEventListener('click', function () {
      console.log('Button clicked');
      navbarMenu.classList.toggle('active');
    
    });
  });
  
var imageSources = ['./src/images/menu-button (3).png', './src/images/menu-button (2).png'];
var currentImageIndex = 0;

function toggleImage() {
  var imgElement = document.getElementById('imageToggle');
  
  currentImageIndex = (currentImageIndex + 1) % imageSources.length;
  imgElement.src = imageSources[currentImageIndex];
}