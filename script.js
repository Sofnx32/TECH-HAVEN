
const banners = document.querySelectorAll('.banner img');
        let currentIndex = 0;
        const indicators = document.querySelectorAll('.indicator');
        const prevButton = document.getElementById('prev');
        const nextButton = document.getElementById('next');

        function showBanner(index) {
            banners.forEach((banner, i) => {
                banner.style.display = i === index ? 'block' : 'none';
                indicators[i].classList.toggle('active', i === index);
            });
        }

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + banners.length) % banners.length;
            showBanner(currentIndex);
        });

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % banners.length;
            showBanner(currentIndex);
        });

        showBanner(currentIndex);
        
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentIndex = index;
                showBanner(currentIndex);
            });
        });

        setInterval(() => {
            currentIndex = (currentIndex + 1) % banners.length;
            showBanner(currentIndex);
        }, 5000);

    
function updateCarousel() {
    const container = document.querySelector('.categorias-container');
    const categoriaWidth = document.querySelector('.categoria').offsetWidth;
    container.style.transform = `translateX(-${currentIndex * categoriaWidth}px)`;
}

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
    });
});


function prevSlide() {
    const totalItems = document.querySelectorAll('.categoria').length;
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateCarousel();
}

function nextSlide() {
    const totalItems = document.querySelectorAll('.categoria').length;
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
}


document.addEventListener('DOMContentLoaded', () => {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', () => {
            const submenu = dropdown.querySelector('.dropdown-menu');
            submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');
    const checkoutBtn = document.getElementById('checkout-btn');

    function updateCart() {
        cartContainer.innerHTML = '';
        let total = 0;
        cartItems.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${item.name}</span>
                <span>$${item.price.toFixed(2)}</span>
                <button class="remove-btn">Eliminar</button>
            `;
            cartContainer.appendChild(li);
            total += item.price;

            li.querySelector('.remove-btn').addEventListener('click', function() {
                const index = cartItems.indexOf(item);
                if (index > -1) {
                    cartItems.splice(index, 1);
                    localStorage.setItem('cart', JSON.stringify(cartItems));
                    updateCart();
                }
            });
        });
        totalAmount.textContent = total.toFixed(2);
    }

    checkoutBtn.addEventListener('click', function() {
        if (cartItems.length > 0) {
            alert('Procediendo al pago...');
            
        } else {
            alert('El carrito está vacío.');
        }
    });

    function addToCart(productName, price) {
        cartItems.push({ name: productName, price: price });
        localStorage.setItem('cart', JSON.stringify(cartItems));
        updateCart();
        alert(`${productName} se añadió al carrito`);
    }

    updateCart();
})

document.querySelectorAll('.btn-comprar').forEach(button => {
    button.addEventListener('click', (event) => {
        const productCard = event.target.closest('.producto');
        const productName = productCard.querySelector('h3').textContent;
        const price = productCard.querySelector('.precio').textContent;
        addToCart(productName, price);
    });
});




document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const category = event.target.textContent;
        filterCategory(category);
    });
});


function cargarCategoria(categoria) {
    fetch('productos.json')
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector('.productos-container');
            container.innerHTML = ''; 
            
            if (data[categoria]) {
                data[categoria].forEach(product => {
                    container.innerHTML += `
                        <div class="producto">
                            <img src="${product.imagen}" alt="${product.nombre}">
                            <h3>${product.nombre}</h3>
                            <p class="precio">S/ ${product.precio}</p>
                            <button class="btn-comprar">Comprar</button>
                        </div>`;
                });
            } else {
                container.innerHTML = '<p>No hay productos disponibles en esta categoría.</p>';
            }
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });
}

window.onload = function() {
    cargarCategoria('celulares');
};

