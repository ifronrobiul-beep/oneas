// Responsive Navigation Menu
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Product Detail Page - Image Gallery
const mainImage = document.getElementById("main-product-image");
const thumbnails = document.querySelectorAll(".thumbnail");

thumbnails.forEach(thumb => {
    thumb.addEventListener("click", function() {
        // Change main image
        const activeThumb = document.querySelector(".thumbnail.active");
        activeThumb.classList.remove("active");
        this.classList.add("active");
        mainImage.src = this.src.replace('100x100', '500x500'); // Assumes placeholder images
    });
});

// "Add to Cart" Button Simulation
const addToCartButtons = document.querySelectorAll(".btn-add-to-cart");

addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
        alert("Product added to cart! (This is a demo)");
    });
});
