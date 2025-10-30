document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.getElementById('navLinks');
    const navbar = document.querySelector('.navbar');

    // 1. Toggle Menu Navigasi Mobile
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        const icon = menuToggle.querySelector('i');
        // Ganti ikon burger dengan ikon silang saat menu terbuka
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // 2. Animasi Scroll (Efek Navbar dan Fade-in Produk)
    window.addEventListener('scroll', () => {
        // Efek bayangan navbar saat di-scroll
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        // Observer untuk Animasi Fade-in pada Produk dan Review
        const observerOptions = {
            threshold: 0.2 // Trigger saat 20% elemen terlihat
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target); // Berhenti mengamati setelah animasi
                }
            });
        }, observerOptions);

        // Amati elemen produk dan review
        document.querySelectorAll('.product-card, .review-card').forEach(el => {
            el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            el.style.transform = 'translateY(20px)';
            observer.observe(el);
        });

    }, { passive: true }); // Menggunakan { passive: true } untuk performa scroll

    // 3. Smooth Scroll untuk Navigasi Internal
    document.querySelectorAll('.nav-links a, .cta-button').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Tutup menu mobile setelah klik
            if (navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            }

            // Ambil hash (#home, #about, dll)
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    // Gunakan fungsi scrollIntoView untuk animasi smooth
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 4. Sederhana untuk fungsionalitas keranjang (hanya simulasi hitungan)
    const cartCount = document.querySelector('.cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            let currentCount = parseInt(cartCount.textContent);
            cartCount.textContent = currentCount + 1;
            
            // Animasi visual saat item ditambahkan
            cartCount.style.backgroundColor = '#FFD700'; // Emas
            cartCount.style.color = '#333333';
            setTimeout(() => {
                cartCount.style.backgroundColor = '#008080'; // Kembali ke Teal
                cartCount.style.color = 'white';
            }, 300);
        });
    });

});