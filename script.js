document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. SCROLL REVEAL & HEADER BEHAVIOR
       ========================================================================== */
    const header = document.getElementById('header');
    
    // Header scroll background change
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Scroll Reveal (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal-fade, .reveal-slide');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Animasyonun sadece bir kez tetiklenmesi için
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* ==========================================================================
       2. STATS COUNTER ANIMATION
       ========================================================================== */
    const statsSection = document.querySelector('.stats-panel');
    const statNumbers = document.querySelectorAll('.stat-number');
    let counted = false;

    const countUp = () => {
        statNumbers.forEach(stat => {
            const targetText = stat.innerText;
            const isPercent = targetText.includes('%');
            const isPlus = targetText.includes('+');
            const isHours = targetText.includes('/');
            
            // Sayısal değeri ayıkla
            let targetValue = parseInt(targetText.replace(/[^0-9]/g, ''), 10);
            let startValue = 0;
            let duration = 2000; // 2 saniye
            let steps = 50;
            let stepTime = duration / steps;
            let increment = Math.ceil(targetValue / steps);
            
            const timer = setInterval(() => {
                startValue += increment;
                if (startValue >= targetValue) {
                    startValue = targetValue;
                    clearInterval(timer);
                }
                
                // Orijinal formata göre geri yazdır
                if (isPercent) {
                    stat.innerText = `%${startValue}`;
                } else if (isPlus) {
                    stat.innerText = `${startValue}+`;
                } else if (isHours) {
                    stat.innerText = '7/24'; // Özel durum
                    clearInterval(timer);
                } else {
                    stat.innerText = startValue;
                }
            }, stepTime);
        });
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                countUp();
                counted = true;
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }


    /* ==========================================================================
       3. MOBILE MENU TOGGLE
       ========================================================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuClose = document.getElementById('menu-close');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const openMenu = () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; // Menü açıkken arka plan kaymasını engelle
    };

    const closeMenu = () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    };

    menuToggle.addEventListener('click', openMenu);
    menuClose.addEventListener('click', closeMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });


    /* ==========================================================================
       4. HERO TYPEWRITER ANIMATION
       ========================================================================== */
    const typeTarget = document.getElementById('type-target');
    const words = ["mantıktır", "adalettir", "güvendir"];
    let wordIndex = 0;
    let charIndex = 8; // "mantıktır" kelimesinin uzunluğu ile başlar
    let isDeleting = false;
    let typeDelay = 150;

    const typewriter = () => {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            charIndex--;
            typeDelay = 75; // Silerken daha hızlı
        } else {
            charIndex++;
            typeDelay = 150;
        }

        typeTarget.innerText = currentWord.substring(0, charIndex);

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeDelay = 2000; // Kelime yazıldıktan sonra bekleme süresi
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeDelay = 500; // Yeni kelimeye geçmeden önce ufak duraksama
        }

        setTimeout(typewriter, typeDelay);
    };

    // Animasyonu başlat
    setTimeout(typewriter, 1500);


    /* ==========================================================================
       5. ÇALIŞMA ALANLARI DETAY MODALI
       ========================================================================== */
    const modal = document.getElementById('details-modal');
    const modalClose = document.getElementById('modal-close');
    const modalTitle = document.getElementById('modal-title');
    const modalIcon = document.getElementById('modal-icon');
    const modalBody = document.getElementById('modal-body-text');
    const practiceCards = document.querySelectorAll('.practice-card');

    // Çalışma alanları veri haritası
    const practiceData = {
        is: {
            title: "İŞ HUKUKU",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`,
            desc: `
                <p>İş hukuku, çalışma yaşamında işçiler ile işverenler arasındaki hak ve borç ilişkilerini düzenleyen son derece hassas bir hukuk alanıdır. Büromuz, gerek bireysel işçilerin hak kayıplarını önlemek gerekse kurumsal şirketlerin iş hukukuna uyumunu sağlamak adına profesyonel hizmet sunar.</p>
                <h4 style="margin: 16px 0 8px; color: var(--primary); font-weight:600;">Başlıca Hizmet Alanlarımız:</h4>
                <ul>
                    <li>Kıdem ve İhbar Tazminatı alacaklarının tahsili davaları</li>
                    <li>İşe İade davaları ve yasal süreç takipleri</li>
                    <li>Fazla mesai, yıllık ücretli izin, hafta tatili ve UBGT ücret alacakları</li>
                    <li>İş kazalarından kaynaklanan maddi ve manevi tazminat süreçleri</li>
                    <li>İşe giriş ve işten çıkış protokollerinin yasal mevzuata uygun düzenlenmesi</li>
                    <li>Arabuluculuk görüşmelerinde etkin temsil</li>
                </ul>
            `
        },
        aile: {
            title: "AİLE HUKUKU",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
            desc: `
                <p>Aile ve boşanma hukuku uyuşmazlıkları, taraflar için yasal boyutun yanı sıra manevi hassasiyet de taşımaktadır. Müvekkillerimizin gizlilik hakkını ve çıkarlarını en üst düzeyde gözeterek süreçleri titizlikle yürütüyoruz.</p>
                <h4 style="margin: 16px 0 8px; color: var(--primary); font-weight:600;">Başlıca Hizmet Alanlarımız:</h4>
                <ul>
                    <li>Anlaşmalı ve Çekişmeli Boşanma davaları</li>
                    <li>Velayetin tevdii, velayet değişimi davaları</li>
                    <li>İştirak ve yoksulluk nafakası talepleri, nafakanın artırılması/azaltılması davaları</li>
                    <li>Maddi ve manevi tazminat talepleri</li>
                    <li>Mal rejimi tasfiyesi, katkı payı ve katılma alacağı davaları</li>
                    <li>Evlilik öncesi mal ayrılığı sözleşmelerinin hazırlanması</li>
                    <li>Soybağının kurulması, babalık ve nesebin reddi davaları</li>
                </ul>
            `
        },
        miras: {
            title: "MİRAS HUKUKU",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>`,
            desc: `
                <p>Miras uyuşmazlıkları, aile bireyleri arasında yasal hakların adil dağıtılmaması durumunda ciddi hak kayıplarına yol açmaktadır. Miras hukukundan doğan hakların tespiti ve korunması için yasal destek sunuyoruz.</p>
                <h4 style="margin: 16px 0 8px; color: var(--primary); font-weight:600;">Başlıca Hizmet Alanlarımız:</h4>
                <ul>
                    <li>Veraset ilamı (mirasçılık belgesi) alınması ve intikal işlemleri</li>
                    <li>Miras paylaşım sözleşmelerinin (Taksim sözleşmesi) hazırlanması</li>
                    <li>Vasiyetname düzenlenmesi ve vasiyetnamenin açılması davaları</li>
                    <li>Muris muvazaası (mirasçılardan mal kaçırma) nedeniyle tapu iptal ve tescil davaları</li>
                    <li>Tenkis davaları (saklı pay haklarının korunması)</li>
                    <li>Redd-i Miras (mirasın reddi) işlemlerinin yapılması</li>
                </ul>
            `
        },
        idare: {
            title: "İDARE HUKUKU",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
            desc: `
                <p>İdare hukuku, devlet ve kamu kurumlarının bireylere uyguladığı işlemlerin hukuka uygunluğunu denetler. Kamu karşısında vatandaşın haklarını savunmak hukuki uzmanlık gerektirir.</p>
                <h4 style="margin: 16px 0 8px; color: var(--primary); font-weight:600;">Başlıca Hizmet Alanlarımız:</h4>
                <ul>
                    <li>İdari işlemlerin iptali davaları (Yürütmenin durdurulması talepli)</li>
                    <li>İdarenin kusurundan doğan zararlar için Tam Yargı (Tazminat) davaları</li>
                    <li>Kamulaştırma ve kamulaştırmasız el atma davaları</li>
                    <li>Memur disiplin cezalarının iptali davaları</li>
                    <li>İdari para cezalarına karşı itiraz süreçleri ve iptal davaları</li>
                    <li>Kamu ihalelerinden kaynaklanan uyuşmazlıkların çözümü</li>
                </ul>
            `
        },
        ticaret: {
            title: "TİCARET HUKUKU",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`,
            desc: `
                <p>Ticaret hayatında şirketlerin karşılaşabileceği hukuki riskleri önceden analiz etmek ve ticari alacakları güvence altına almak işletmelerin sürdürülebilirliği için hayatidir.</p>
                <h4 style="margin: 16px 0 8px; color: var(--primary); font-weight:600;">Başlıca Hizmet Alanlarımız:</h4>
                <ul>
                    <li>Şirket kuruluşu, ana sözleşme ve ortaklık anlaşmalarının tanzimi</li>
                    <li>Bayilik, distribütörlük, franchise ve lojistik sözleşmelerinin hazırlanması</li>
                    <li>Şirket alacaklarının icra ve iflas yoluyla tahsili takipleri</li>
                    <li>Haksız rekabet uyuşmazlıkları ve tazminat davaları</li>
                    <li>Kıymetli evraklardan (çek, poliçe, bono) doğan alacak davaları</li>
                    <li>Şirketlere sürekli hukuki danışmanlık hizmeti</li>
                </ul>
            `
        },
        gayrimenkul: {
            title: "GAYRİMENKUL HUKUKU",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
            desc: `
                <p>Taşınmaz hukuku Türkiye'de en çok dava konusu olan alanların başında gelir. Mülkiyet hakkının korunması, tapu tescilleri ve kira ilişkileri büromuzun uzmanlık alanlarındandır.</p>
                <h4 style="margin: 16px 0 8px; color: var(--primary); font-weight:600;">Başlıca Hizmet Alanlarımız:</h4>
                <ul>
                    <li>Tapu İptal ve Tescil davaları (İnanç sözleşmesi, muvazaalı satış vb.)</li>
                    <li>İzale-i Şüyu (Ortaklığın Giderilmesi) davaları</li>
                    <li>Kira sözleşmelerinin hazırlanması, kira tespiti ve kira uyarlama davaları</li>
                    <li>İhtiyaç veya tahliye taahhütnamesi nedeniyle tahliye davaları</li>
                    <li>Elatmanın önlenmesi (Müdahalenin men-i) ve Ecrimisil (Haksız işgal tazminatı) davaları</li>
                    <li>Geçit hakkı ve irtifak haklarının kurulması davaları</li>
                </ul>
            `
        },
        devremulk: {
            title: "DEVREMÜLK HUKUKU",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
            desc: `
                <p>Devremülk sözleşmeleri çoğunlukla tüketicilerin yanıltılması veya cayma haklarının kullandırılmaması nedeniyle uyuşmazlıklara yol açmaktadır. Tüketici Kanunu kapsamında haklarınızı koruyoruz.</p>
                <h4 style="margin: 16px 0 8px; color: var(--primary); font-weight:600;">Başlıca Hizmet Alanlarımız:</h4>
                <ul>
                    <li>Devremülk satış sözleşmelerinin iptali davaları</li>
                    <li>Yasal süre içinde cayma hakkının kullanılması ve ihtarname gönderilmesi</li>
                    <li>Ödenen peşinat ve senetlerin iadesi davaları</li>
                    <li>Fahiş aidat talepleri ve haksız devremülk yönetim kararlarına itirazlar</li>
                    <li>Tüketici Hakem Heyeti başvuruları ve süreç takipleri</li>
                </ul>
            `
        },
        yabancilar: {
            title: "YABANCILAR HUKUKU",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,
            desc: `
                <p>Türkiye'de ikamet eden veya ticari faaliyet yürüten yabancı ülke vatandaşlarının resmi makamlar önündeki tüm yasal başvurularını ve davalarını takip etmekteyiz.</p>
                <h4 style="margin: 16px 0 8px; color: var(--primary); font-weight:600;">Başlıca Hizmet Alanlarımız:</h4>
                <ul>
                    <li>Kısa ve uzun dönem İkamet İzni (Oturma izni) başvuruları</li>
                    <li>Yabancı personeller için Çalışma İzni başvuruları</li>
                    <li>Yatırım yoluyla veya genel hükümler çerçevesinde Türk Vatandaşlığı başvuruları</li>
                    <li>Sınır dışı (Deport) kararlarına itiraz ve deport kaldırma davaları</li>
                    <li>Yabancıların Türkiye'de mülk edinimi süreçlerinin takibi</li>
                </ul>
            `
        },
        sigorta: {
            title: "SİGORTA HUKUKU",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
            desc: `
                <p>Trafik, kasko, yangın veya sağlık sigortaları başta olmak üzere poliçelerden doğan tazminat alacaklarının tahsil edilmesi ve kusur oranına göre tazminat tespiti hizmetlerimiz arasındadır.</p>
                <h4 style="margin: 16px 0 8px; color: var(--primary); font-weight:600;">Başlıca Hizmet Alanlarımız:</h4>
                <ul>
                    <li>Trafik kazalarından kaynaklanan araç Değer Kaybı davaları</li>
                    <li>Kazaya bağlı bedeni zararlar ve sakatlık tazminatları</li>
                    <li>Destekten Yoksun Kalma tazminatı davaları</li>
                    <li>Kasko, konut ve yangın sigorta ödemelerinin tahsil süreçleri</li>
                    <li>Sigorta Tahkim Komisyonu nezdinde uyuşmazlık çözümleri</li>
                </ul>
            `
        }
    };

    const openModal = (key) => {
        const data = practiceData[key];
        if (data) {
            modalTitle.innerText = data.title;
            modalIcon.innerHTML = data.icon;
            modalBody.innerHTML = data.desc;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    practiceCards.forEach(card => {
        const areaKey = card.getAttribute('data-area');
        const btnMore = card.querySelector('.btn-card-more');
        
        // Kartın herhangi bir yerine veya "Detayları Gör" butonuna tıklanması
        card.addEventListener('click', (e) => {
            if (e.target.tagName !== 'A') { // Eğer A etiketine tıklanmadıysa modal aç
                openModal(areaKey);
            }
        });
    });

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // ESC tuşuyla kapatma
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Modaldaki CTA butonuna tıklandığında modalı kapatıp formu odaklama
    const modalCta = document.getElementById('modal-cta');
    modalCta.addEventListener('click', () => {
        closeModal();
    });


    /* ==========================================================================
       6. MÜVEKKİL YORUMLARI SLIDER (CAROUSEL)
       ========================================================================== */
    const track = document.getElementById('carousel-track');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const dotsContainer = document.getElementById('carousel-dots');
    
    if (track) {
        const slides = Array.from(track.children);
        let currentIndex = 0;
        let slideInterval;

        // Noktaları (Dots) dinamik oluştur
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetAutoplay();
            });
            dotsContainer.appendChild(dot);
        });

        const dots = Array.from(dotsContainer.children);

        const updateDots = (index) => {
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
        };

        const goToSlide = (index) => {
            track.style.transform = `translateX(-${index * 100}%)`;
            currentIndex = index;
            updateDots(index);
        };

        const nextSlide = () => {
            let nextIndex = currentIndex + 1;
            if (nextIndex >= slides.length) {
                nextIndex = 0;
            }
            goToSlide(nextIndex);
        };

        const prevSlide = () => {
            let prevIndex = currentIndex - 1;
            if (prevIndex < 0) {
                prevIndex = slides.length - 1;
            }
            goToSlide(prevIndex);
        };

        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoplay();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoplay();
        });

        // Otomatik Oynatma (Autoplay)
        const startAutoplay = () => {
            slideInterval = setInterval(nextSlide, 6000); // Her 6 saniyede bir kaydır
        };

        const resetAutoplay = () => {
            clearInterval(slideInterval);
            startAutoplay();
        };

        startAutoplay();

        // Dokunmatik Kaydırma Desteği (Swipe - Mobil için)
        let startX = 0;
        let isSwiping = false;

        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isSwiping = true;
            clearInterval(slideInterval);
        }, { passive: true });

        track.addEventListener('touchmove', (e) => {
            if (!isSwiping) return;
            const diffX = e.touches[0].clientX - startX;
            // Eşik değeri aşılırsa kaydır
            if (diffX > 50) {
                prevSlide();
                isSwiping = false;
                startAutoplay();
            } else if (diffX < -50) {
                nextSlide();
                isSwiping = false;
                startAutoplay();
            }
        }, { passive: true });

        track.addEventListener('touchend', () => {
            isSwiping = false;
            startAutoplay();
        });
    }


    /* ==========================================================================
       7. SIKÇA SORULAN SORULAR (SSS) AKORDEON
       ========================================================================== */
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const body = header.nextElementSibling;
            const isActive = item.classList.contains('active');

            // Diğer tüm akordeonları kapat
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.accordion-body').style.maxHeight = null;
            });

            // Tıklananı aç veya kapat
            if (!isActive) {
                item.classList.add('active');
                body.style.maxHeight = body.scrollHeight + 'px';
            }
        });
    });


    /* ==========================================================================
       8. İLETİŞİM FORMU DOĞRULAMA VE GÖNDERİM SİMÜLASYONU
       ========================================================================== */
    const contactForm = document.getElementById('law-contact-form');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const formStatus = document.getElementById('form-status');

    // Hata durumlarını temizleme yardımcı fonksiyonu
    const clearError = (inputEl, errorId) => {
        const parent = inputEl.closest('.form-group') || inputEl.closest('.form-checkbox');
        if (parent) {
            parent.classList.remove('invalid');
        }
    };

    // Hata durumunu tetikleme fonksiyonu
    const showError = (inputEl, errorId) => {
        const parent = inputEl.closest('.form-group') || inputEl.closest('.form-checkbox');
        if (parent) {
            parent.classList.add('invalid');
        }
    };

    // Form doğrulaması
    const validateForm = () => {
        let isValid = true;
        
        // Ad Soyad Kontrolü
        const nameInput = document.getElementById('form-name');
        if (nameInput.value.trim().length < 3) {
            showError(nameInput);
            isValid = false;
        } else {
            clearError(nameInput);
        }

        // E-Posta Kontrolü
        const emailInput = document.getElementById('form-email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            showError(emailInput);
            isValid = false;
        } else {
            clearError(emailInput);
        }

        // Telefon Kontrolü
        const phoneInput = document.getElementById('form-phone');
        if (phoneInput.value.trim().length < 10) {
            showError(phoneInput);
            isValid = false;
        } else {
            clearError(phoneInput);
        }

        // Konu Seçimi
        const subjectSelect = document.getElementById('form-subject');
        if (subjectSelect.value === "") {
            showError(subjectSelect);
            isValid = false;
        } else {
            clearError(subjectSelect);
        }

        // Mesaj Kontrolü
        const messageText = document.getElementById('form-message');
        if (messageText.value.trim().length < 10) {
            showError(messageText);
            isValid = false;
        } else {
            clearError(messageText);
        }

        // KVKK Checkbox Kontrolü
        const kvkkCheck = document.getElementById('kvkk-check');
        if (!kvkkCheck.checked) {
            showError(kvkkCheck);
            isValid = false;
        } else {
            clearError(kvkkCheck);
        }

        return isValid;
    };

    // Dinamik input takibi (kullanıcı düzeltmeye başladığında hatayı kaldır)
    const formFields = contactForm.querySelectorAll('input, select, textarea');
    formFields.forEach(field => {
        field.addEventListener('input', () => clearError(field));
        field.addEventListener('change', () => clearError(field));
    });

    // Form Gönderim Yakalama
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        formStatus.classList.remove('success', 'error');
        formStatus.style.display = 'none';

        if (!validateForm()) {
            formStatus.innerText = "Lütfen formdaki zorunlu alanları eksiksiz doldurun.";
            formStatus.classList.add('error');
            formStatus.style.display = 'block';
            return;
        }

        // Butonu yükleniyor durumuna sok
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Sunucu gönderim simülasyonu (API yerine Timeout)
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            // Başarılı bildirim
            formStatus.innerText = "Mesajınız başarıyla gönderildi. Avukat Ömer Baran en kısa sürede sizinle iletişime geçecektir.";
            formStatus.classList.add('success');
            formStatus.style.display = 'block';

            // Formu sıfırla
            contactForm.reset();
            
            // 8 saniye sonra bildirimi gizle
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 8000);
            
        }, 1800);
    });

    // KVKK Aydınlatma Metni linkine sahte tıklama
    const kvkkLink = document.getElementById('kvkk-link');
    if (kvkkLink) {
        kvkkLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert("KVKK AYDINLATMA METNİ:\n\nAvukat Ömer Baran Hukuk Bürosu olarak, form aracılığıyla paylaştığınız Ad Soyad, E-posta, Telefon ve uyuşmazlık detaylarınızı sadece randevu oluşturma ve size geri dönüş sağlama amaçlarıyla, 6698 sayılı Kişisel Verilerin Korunması Kanunu'na uygun olarak işlemekteyiz. Verileriniz üçüncü şahıslarla asla paylaşılmamaktadır.");
        });
    }

});
