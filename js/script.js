
/* =========================================
   HEROOCAMSEWA - MAIN JAVASCRIPT
========================================= */


/* =========================================
   NAVBAR MOBILE
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("active");

    const icon = menuToggle.querySelector("i");

    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-xmark");

});

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

        const icon = menuToggle.querySelector("i");

        icon.classList.add("fa-bars");
        icon.classList.remove("fa-xmark");

        navLinks.forEach(item => item.classList.remove("active"));

        link.classList.add("active");

    });

});


/* =========================================
   NAVBAR SCROLL
========================================= */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* =========================================
   DATA PRODUK KAMERA
========================================= */

const products = [

    {
        id: 1,
        name: "Sony A7 III",
        category: "sony",
        type: "Camera",
        price: 175000,
        image: "images/sony-a7iii.jpg",
        description: "Full Frame Mirrorless Camera, cocok untuk foto dan video."
    },

    {
        id: 2,
        name: "Sony A6400",
        category: "sony",
        type: "Camera",
        price: 125000,
        image: "images/sony-a6400.jpg",
        description: "Mirrorless APS-C dengan autofocus cepat."
    },

    {
        id: 3,
        name: "Canon EOS R",
        category: "canon",
        type: "Camera",
        price: 150000,
        image: "images/canon-eos-r.jpg",
        description: "Full Frame Mirrorless untuk fotografi profesional."
    },

    {
        id: 4,
        name: "Canon EOS 90D",
        category: "canon",
        type: "Camera",
        price: 125000,
        image: "images/canon-90d.jpg",
        description: "DSLR dengan kualitas gambar tajam."
    },

    {
        id: 5,
        name: "Fujifilm X-T4",
        category: "fujifilm",
        type: "Camera",
        price: 150000,
        image: "images/fujifilm-xt4.jpg",
        description: "Mirrorless dengan warna khas Fujifilm."
    },

    {
        id: 6,
        name: "Fujifilm X-S10",
        category: "fujifilm",
        type: "Camera",
        price: 125000,
        image: "images/fujifilm-xs10.jpg",
        description: "Kamera compact untuk foto dan video."
    },

    {
        id: 7,
        name: "Sony FE 50mm",
        category: "lensa",
        type: "Lens",
        price: 75000,
        image: "images/lens-sony.jpg",
        description: "Lensa fix untuk portrait dan fotografi."
    },

    {
        id: 8,
        name: "Canon 50mm STM",
        category: "lensa",
        type: "Lens",
        price: 65000,
        image: "images/lens-canon.jpg",
        description: "Lensa portrait dengan hasil bokeh."
    },

    {
        id: 9,
        name: "Sigma 30mm f/1.4",
        category: "lensa",
        type: "Lens",
        price: 85000,
        image: "images/lens-sigma.jpg",
        description: "Lensa prime dengan aperture besar."
    }

];


/* =========================================
   FORMAT RUPIAH
========================================= */

function formatRupiah(number) {

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(number);

}


/* =========================================
   TAMPILKAN PRODUK
========================================= */

const productGrid = document.getElementById("productGrid");

function displayProducts(data) {

    productGrid.innerHTML = "";

    if (data.length === 0) {

        productGrid.innerHTML = `
            <div class="no-product">
                <i class="fa-solid fa-camera" style="font-size:35px;"></i>
                <h3 style="margin-top:15px;">Produk tidak ditemukan</h3>
                <p style="margin-top:8px;">Coba kata kunci lainnya.</p>
            </div>
        `;

        return;
    }

    data.forEach((product, index) => {

        const card = document.createElement("article");

        card.className = "product-card";

        card.style.animationDelay = `${index * 0.07}s`;

        const categoryName = product.category === "lensa"
            ? "Lensa"
            : product.category;

        card.innerHTML = `

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                    onerror="this.src='https://placehold.co/600x400/f1f1ed/555?text=Camera+Product'"
                >

                <span class="product-category">
                    ${categoryName}
                </span>

            </div>

            <div class="product-body">

                <h3>${product.name}</h3>

                <p class="product-description">
                    ${product.description}
                </p>

                <div class="product-price">

                    <div>
                        <span>Harga sewa / hari</span>
                        <strong>${formatRupiah(product.price)}</strong>
                    </div>

                    <button
                        class="product-booking"
                        data-id="${product.id}"
                        aria-label="Sewa ${product.name}"
                    >
                        <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </button>

                </div>

            </div>

        `;

        productGrid.appendChild(card);

    });

}


/* TAMPILKAN SEMUA PRODUK */

displayProducts(products);


/* =========================================
   FILTER KATEGORI
========================================= */

const filterButtons = document.querySelectorAll(".filter-btn");

let currentFilter = "all";

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        filterAndSearch();

    });

});


/* =========================================
   SEARCH PRODUK
========================================= */

const searchProduct = document.getElementById("searchProduct");

searchProduct.addEventListener("input", filterAndSearch);


function filterAndSearch() {

    const keyword = searchProduct.value.toLowerCase().trim();

    const filtered = products.filter(product => {

        const matchCategory =
            currentFilter === "all" ||
            product.category === currentFilter;

        const matchSearch =
            product.name.toLowerCase().includes(keyword) ||
            product.category.toLowerCase().includes(keyword) ||
            product.description.toLowerCase().includes(keyword);

        return matchCategory && matchSearch;

    });

    displayProducts(filtered);

}


/* =========================================
   BOOKING MODAL
========================================= */

const bookingModal = document.getElementById("bookingModal");

const closeBooking = document.getElementById("closeBooking");

const selectedProduct = document.getElementById("selectedProduct");


function openBooking(productId) {

    const product = products.find(item => item.id === productId);

    if (!product) return;

    selectedProduct.value = product.name;

    bookingModal.classList.add("show");

    document.body.style.overflow = "hidden";

}


function hideBooking() {

    bookingModal.classList.remove("show");

    document.body.style.overflow = "";

}


productGrid.addEventListener("click", (event) => {

    const button = event.target.closest(".product-booking");

    if (!button) return;

    const productId = Number(button.dataset.id);

    openBooking(productId);

});


closeBooking.addEventListener("click", hideBooking);


bookingModal.addEventListener("click", (event) => {

    if (event.target === bookingModal) {
        hideBooking();
    }

});


/* =========================================
   VALIDASI TANGGAL SEWA
========================================= */

const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");
const rentalDuration = document.getElementById("rentalDuration");

const today = new Date();
const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
].join("-");

startDate.min = todayString;
endDate.min = todayString;


function calculateDuration() {

    if (!startDate.value || !endDate.value) {

        rentalDuration.value = "";

        return;

    }

    const start = new Date(startDate.value + "T00:00:00");
    const end = new Date(endDate.value + "T00:00:00");

    const difference = Math.round(
        (end - start) / (1000 * 60 * 60 * 24)
    );

    if (difference < 0) {

        rentalDuration.value = "Tanggal tidak valid";

        return;

    }

    if (difference === 0) {

        rentalDuration.value = "1 hari";

        return;

    }

    rentalDuration.value = `${difference + 1} hari`;

}


startDate.addEventListener("change", () => {

    endDate.min = startDate.value || todayString;

    if (endDate.value && endDate.value < startDate.value) {
        endDate.value = "";
    }

    calculateDuration();

});


endDate.addEventListener("change", calculateDuration);


/* =========================================
   FORM BOOKING KE WHATSAPP ADMIN
========================================= */

const bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const productName = selectedProduct.value;

    const name = document.getElementById("customerName").value.trim();

    const phone = document.getElementById("customerPhone").value.trim();

    const address = document.getElementById("customerAddress").value.trim();

    const identity = document.getElementById("identityType").value;

    const start = startDate.value;

    const end = endDate.value;

    const duration = rentalDuration.value;

    const note = document.getElementById("customerNote").value.trim();

    const agree = document.getElementById("agreeTerms").checked;

    if (!name || !phone || !address || !identity || !start || !end) {

        showToast("Mohon lengkapi seluruh data!");

        return;

    }

    if (!/^[0-9+\-\s]{9,16}$/.test(phone)) {

        showToast("Nomor WhatsApp tidak valid!");

        return;

    }

    if (!agree) {

        showToast("Silakan setujui ketentuan penyewaan!");

        return;

    }

    if (new Date(end + "T00:00:00") <
        new Date(start + "T00:00:00")) {

        showToast("Tanggal pengembalian tidak valid!");

        return;

    }

    if (new Date(start + "T00:00:00") <
        new Date(todayString + "T00:00:00")) {

        showToast("Tanggal mulai sewa tidak boleh di masa lalu!");

        return;

    }

    /*
       GANTI NOMOR DI BAWAH DENGAN NOMOR WHATSAPP ADMIN.
       Gunakan kode negara 62 tanpa tanda +.
    */

    const adminWhatsApp = "6285382920804";

    const message = `
*PENGAJUAN PENYEWAAN KAMERA*
HEROOCAMSEWA MAKASSAR - GOWA

*DATA PENYEWA*
Nama: ${name}
WhatsApp: ${phone}
Alamat: ${address}

*INFORMASI IDENTITAS*
Jenis Identitas: ${identity}
Identitas asli akan ditunjukkan untuk verifikasi admin.

*DETAIL PENYEWAAN*
Produk: ${productName}
Mulai Sewa: ${start}
Pengembalian: ${end}
Durasi: ${duration}

*CATATAN*
${note || "-"}

Saya menyatakan data yang diberikan benar dan bersedia mengikuti ketentuan penyewaan HEROOCAMSEWA.

Mohon informasi mengenai proses verifikasi dan persetujuan pengajuan saya.

Terima kasih.
    `;

    const whatsappURL =
        `https://wa.me/${adminWhatsApp}?text=${encodeURIComponent(message)}`;

    showToast("Membuka WhatsApp untuk pengajuan...");

    window.open(whatsappURL, "_blank");

    hideBooking();

    bookingForm.reset();

    rentalDuration.value = "";

});


/* =========================================
   TOAST NOTIFICATION
========================================= */

const toast = document.getElementById("toast");

const toastMessage = document.getElementById("toastMessage");

let toastTimer;

function showToast(message) {

    toastMessage.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


/* =========================================
   GALLERY LIGHTBOX
========================================= */

const galleryImages = document.querySelectorAll(".gallery-item img");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const closeLightbox = document.getElementById("closeLightbox");

const prevImage = document.getElementById("prevImage");

const nextImage = document.getElementById("nextImage");

let currentImage = 0;

const imageList = Array.from(galleryImages);


function showImage(index) {

    if (index < 0) {
        currentImage = imageList.length - 1;
    } else if (index >= imageList.length) {
        currentImage = 0;
    } else {
        currentImage = index;
    }

    lightboxImage.src = imageList[currentImage].src;

    lightboxImage.alt = imageList[currentImage].alt;

}


galleryImages.forEach((image, index) => {

    image.addEventListener("click", () => {

        currentImage = index;

        showImage(currentImage);

        lightbox.classList.add("show");

        document.body.style.overflow = "hidden";

    });

});


function hideLightbox() {

    lightbox.classList.remove("show");

    document.body.style.overflow = "";

}


closeLightbox.addEventListener("click", hideLightbox);


prevImage.addEventListener("click", () => {

    showImage(currentImage - 1);

});


nextImage.addEventListener("click", () => {

    showImage(currentImage + 1);

});


lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
        hideLightbox();
    }

});


/* =========================================
   KEYBOARD LIGHTBOX
========================================= */

document.addEventListener("keydown", (event) => {

    if (!lightbox.classList.contains("show")) return;

    if (event.key === "Escape") {
        hideLightbox();
    }

    if (event.key === "ArrowRight") {
        showImage(currentImage + 1);
    }

    if (event.key === "ArrowLeft") {
        showImage(currentImage - 1);
    }

});


/* =========================================
   DATA TESTIMONI
========================================= */

/*
   DATA DI BAWAH ADALAH CONTOH TAMPILAN.
   GANTI DENGAN TESTIMONI PELANGGAN ASLI.
*/

const testimonials = [

    {
        name: "Nama Pelanggan 1",
        role: "Pelanggan HEROOCAMSEWA",
        initial: "A",
        text: "Tuliskan pengalaman pelanggan setelah menyewa kamera di HEROOCAMSEWA."
    },

    {
        name: "Nama Pelanggan 2",
        role: "Pelanggan HEROOCAMSEWA",
        initial: "B",
        text: "Tuliskan ulasan asli pelanggan mengenai kualitas kamera dan pelayanan."
    },

    {
        name: "Nama Pelanggan 3",
        role: "Pelanggan HEROOCAMSEWA",
        initial: "C",
        text: "Tambahkan pengalaman pelanggan lainnya di bagian testimoni ini."
    }

];


let currentTestimonial = 0;

const testimonialContent = document.getElementById("testimonialContent");

const testimonialText = document.getElementById("testimonialText");

const testimonialName = document.getElementById("testimonialName");

const testimonialRole = document.getElementById("testimonialRole");

const userAvatar = document.getElementById("userAvatar");

const testimonialDots = document.getElementById("testimonialDots");


function displayTestimonial(index) {

    currentTestimonial =
        (index + testimonials.length) % testimonials.length;

    const item = testimonials[currentTestimonial];

    testimonialContent.style.animation = "none";

    void testimonialContent.offsetWidth;

    testimonialContent.style.animation = "fadeUp 0.4s ease";

    testimonialText.textContent = `"${item.text}"`;

    testimonialName.textContent = item.name;

    testimonialRole.textContent = item.role;

    userAvatar.textContent = item.initial;

    testimonialDots.innerHTML = "";

    testimonials.forEach((_, dotIndex) => {

        const dot = document.createElement("button");

        dot.className =
            dotIndex === currentTestimonial
                ? "testimonial-dot active"
                : "testimonial-dot";

        dot.setAttribute("aria-label", `Testimoni ${dotIndex + 1}`);

        dot.addEventListener("click", () => {

            displayTestimonial(dotIndex);

            resetTestimonialTimer();

        });

        testimonialDots.appendChild(dot);

    });

}


document.getElementById("prevTestimonial").addEventListener("click", () => {

    displayTestimonial(currentTestimonial - 1);

    resetTestimonialTimer();

});


document.getElementById("nextTestimonial").addEventListener("click", () => {

    displayTestimonial(currentTestimonial + 1);

    resetTestimonialTimer();

});


let testimonialTimer;

function startTestimonialTimer() {

    testimonialTimer = setInterval(() => {

        displayTestimonial(currentTestimonial + 1);

    }, 5000);

}


function resetTestimonialTimer() {

    clearInterval(testimonialTimer);

    startTestimonialTimer();

}


displayTestimonial(0);

startTestimonialTimer();


/* =========================================
   SCROLL REVEAL ANIMATION
========================================= */

const revealElements = document.querySelectorAll(
    ".section-heading, .step-card, .requirement-box, .about-image, .about-content, .gallery-item"
);

revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform = "translateY(25px)";

    element.style.transition = "opacity 0.7s ease, transform 0.7s ease";

});


const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";

            entry.target.style.transform = "translateY(0)";

            revealObserver.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.12
});


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================
   SELESAI
========================================= */

console.log("HEROOCAMSEWA Website Loaded Successfully!");
