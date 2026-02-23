document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
        });
    }

    // Floating Buttons Scroll Reveal
    const upBtn = document.querySelector('.up-btn');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            upBtn.classList.add('show');
        } else {
            upBtn.classList.remove('show');
        }
    });

    // Scroll to Top
    if (upBtn) {
        upBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Auto TOC Generation
    const tocList = document.querySelector('.toc-list ul');
    const articleBody = document.querySelector('.article-content');

    if (tocList && articleBody) {
        const headings = articleBody.querySelectorAll('h2, h3');
        headings.forEach((heading, index) => {
            const id = `heading-${index}`;
            heading.id = id;

            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `#${id}`;
            a.textContent = heading.textContent;

            if (heading.tagName === 'H3') {
                const parentLi = tocList.lastElementChild;
                if (parentLi) {
                    let subUl = parentLi.querySelector('ul');
                    if (!subUl) {
                        subUl = document.createElement('ul');
                        parentLi.appendChild(subUl);
                    }
                    li.appendChild(a);
                    subUl.appendChild(li);
                }
            } else {
                li.appendChild(a);
                tocList.appendChild(li);
            }
        });

        // TOC Toggle
        const tocHeader = document.querySelector('.toc-header');
        const tocContent = document.querySelector('.toc-list');
        const tocIcon = document.querySelector('.toc-header i');

        if (tocHeader) {
            tocHeader.addEventListener('click', () => {
                tocContent.classList.toggle('hidden');
                if (tocIcon) {
                    tocIcon.style.transform = tocContent.classList.contains('hidden') ? 'rotate(180deg)' : 'rotate(0deg)';
                }
            });
        }
    }

    // FAQ Toggle
    const faqs = document.querySelectorAll('.faq-item');
    faqs.forEach(faq => {
        const question = faq.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = faq.classList.contains('active');
            faqs.forEach(f => f.classList.remove('active'));
            if (!isActive) {
                faq.classList.add('active');
            }
        });
    });

    // Share Buttons Logic
    const shareBtns = document.querySelectorAll('.share-btn');
    const currentUrl = encodeURIComponent(window.location.href);
    const pageTitle = encodeURIComponent(document.title);

    shareBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            let url = '';
            if (btn.classList.contains('share-wa')) {
                url = `https://api.whatsapp.com/send?text=${pageTitle}%20${currentUrl}`;
            } else if (btn.classList.contains('share-fb')) {
                url = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
            } else if (btn.classList.contains('share-tw')) {
                url = `https://twitter.com/intent/tweet?text=${pageTitle}&url=${currentUrl}`;
            }
            if (url) window.open(url, '_blank');
        });
    });

    // Reveal on scroll
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                el.classList.add('active');
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
                el.style.transition = '0.8s ease-out';
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
});
