/* portfolio.js — Tab navigation, project filter, and modal logic */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* =====================================================
       Tab / Section Navigation
    ===================================================== */
    var navTabs   = document.querySelectorAll('.nav-tab');
    var sections  = document.querySelectorAll('.portfolio-section');

    function switchSection(sectionId) {
      sections.forEach(function (s) { s.classList.remove('active-section'); });
      navTabs.forEach(function (t) { t.classList.remove('active'); });

      var target    = document.getElementById(sectionId + '-section');
      var activeTab = document.querySelector('[data-section="' + sectionId + '"]');

      if (target)    target.classList.add('active-section');
      if (activeTab) activeTab.classList.add('active');
    }

    navTabs.forEach(function (tab) {
      tab.addEventListener('click', function (e) {
        e.preventDefault();
        switchSection(this.dataset.section);
      });
    });

    /* Handle deep-link hash on load */
    var hash = window.location.hash.replace('#', '');
    if (hash === 'about' || hash === 'education' || hash === 'projects') {
      switchSection(hash);
    }

    /* =====================================================
       Project Filter
    ===================================================== */
    var filterBtns = document.querySelectorAll('.f_btn');

    filterBtns.forEach(function (btn) {
      var radio = btn.querySelector('input[type="radio"]');
      if (!radio) return;

      radio.addEventListener('change', function () {
        var value = this.value;

        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        document.querySelectorAll('.my-item').forEach(function (item) {
          if (value === 'all' || item.classList.contains(value)) {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });

    /* =====================================================
       Thumbnail Slideshow for Project Cards
    ===================================================== */
    document.querySelectorAll('.cases__preview').forEach(function (preview) {
      var images = preview.querySelectorAll('.cases__pic');
      var prevBtn = preview.querySelector('.slide-nav.prev');
      var nextBtn = preview.querySelector('.slide-nav.next');

      if (images.length <= 1) return; // No slideshow needed for single image

      var currentIndex = 0;

      function showSlide(index) {
        images.forEach(function (img) { img.classList.remove('active'); });
        images[index].classList.add('active');
      }

      if (prevBtn) {
        prevBtn.addEventListener('click', function (e) {
          e.stopPropagation(); // Prevent opening modal
          currentIndex = (currentIndex - 1 + images.length) % images.length;
          showSlide(currentIndex);
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', function (e) {
          e.stopPropagation(); // Prevent opening modal
          currentIndex = (currentIndex + 1) % images.length;
          showSlide(currentIndex);
        });
      }

      // Auto-advance slideshow every 3 seconds
      var autoAdvance = setInterval(function () {
        currentIndex = (currentIndex + 1) % images.length;
        showSlide(currentIndex);
      }, 3000);

      // Pause auto-advance on hover
      preview.addEventListener('mouseenter', function () {
        clearInterval(autoAdvance);
      });

      preview.addEventListener('mouseleave', function () {
        autoAdvance = setInterval(function () {
          currentIndex = (currentIndex + 1) % images.length;
          showSlide(currentIndex);
        }, 3000);
      });
    });

    /* =====================================================
       Project Detail Modal
    ===================================================== */
    var modal      = document.getElementById('project-modal');
    var modalClose = document.getElementById('modal-close');
    var modalGallery = document.getElementById('modal-gallery');

    if (modal && modalClose) {

      function openModal(data) {
        /* Title */
        document.getElementById('modal-title').textContent       = data.title       || '';
        document.getElementById('modal-description').textContent = data.description || '';

        /* Category badge */
        var catEl = document.getElementById('modal-category');
        catEl.textContent           = data.category       || '';
        catEl.style.backgroundColor = data.category_color || '#4e65fd';

        /* Preview gradient with optional image */
        var previewEl          = document.getElementById('modal-preview');
        var primaryImage       = data.image || (data.images && data.images[0]);
        previewEl.style.background = data.gradient || '#4e65fd';
        previewEl.innerHTML    = '';
        if (primaryImage) {
          var img = document.createElement('img');
          img.src = primaryImage;
          img.alt = data.title || '';
          img.className = 'cases__pic';
          previewEl.appendChild(img);
        }

        /* Gallery images */
        if (modalGallery) {
          modalGallery.innerHTML = '';
          var galleryImages = [];
          if (data.images && data.images.length) {
            galleryImages = data.images;
          } else if (primaryImage) {
            galleryImages = [primaryImage];
          }

          if (galleryImages.length) {
            modalGallery.style.display = 'grid';
            galleryImages.forEach(function (src, idx) {
              var galleryImg = document.createElement('img');
              galleryImg.src = src;
              var altTitle = data.title ? data.title + ' screenshot ' + (idx + 1) : 'Project screenshot';
              galleryImg.alt = altTitle;
              galleryImg.dataset.lightboxIndex = idx;
              galleryImg.dataset.lightboxImages = JSON.stringify(galleryImages);
              modalGallery.appendChild(galleryImg);
            });
          } else {
            modalGallery.style.display = 'none';
          }
        }

        /* Tech tags */
        var detailsEl = document.getElementById('modal-details');
        detailsEl.innerHTML = '';

        if (data.technologies) {
          var techDiv = document.createElement('div');
          techDiv.className = 'modal-tech';
          data.technologies.split(',').forEach(function (t) {
            var tag = document.createElement('span');
            tag.className   = 'tech-tag';
            tag.textContent = t.trim();
            techDiv.appendChild(tag);
          });
          detailsEl.appendChild(techDiv);
        }

        /* Bullet-point details */
        if (data.details && data.details.length) {
          var ul = document.createElement('ul');
          ul.className = 'modal-details-list';
          data.details.forEach(function (point) {
            var li = document.createElement('li');
            li.textContent = point;
            ul.appendChild(li);
          });
          detailsEl.appendChild(ul);
        }

        /* View project link */
        document.getElementById('modal-link').href = data.url || '#';

        /* GitHub link */
        var githubLink = document.getElementById('modal-github-link');
        if (data.github_url) {
          githubLink.href = data.github_url;
          githubLink.style.display = 'inline-flex';
        } else {
          githubLink.style.display = 'none';
        }

        /* Open */
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }

      function closeModal() {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }

      modalClose.addEventListener('click', closeModal);

      modal.addEventListener('click', function (e) {
        if (e.target === modal) closeModal();
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
      });

      /* Attach click & keyboard handlers to every project card */
      document.querySelectorAll('.my-item').forEach(function (item) {
        item.addEventListener('click', function () {
          var idx  = parseInt(this.dataset.projectId, 10);
          var data = portfolioProjects[idx];
          if (data) openModal(data);
        });

        item.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            var idx  = parseInt(this.dataset.projectId, 10);
            var data = portfolioProjects[idx];
            if (data) openModal(data);
          }
        });
      });

    } /* end if (modal && modalClose) */

    /* =====================================================
       Lightbox for Gallery Images
    ===================================================== */
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightbox-img');
    var lightboxClose = document.getElementById('lightbox-close');
    var lightboxPrev = document.getElementById('lightbox-prev');
    var lightboxNext = document.getElementById('lightbox-next');
    var currentLightboxImages = [];
    var currentLightboxIndex = 0;

    function openLightbox(images, index) {
      currentLightboxImages = images;
      currentLightboxIndex = index;
      lightboxImg.src = images[index];
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Show/hide navigation buttons based on image count
      if (images.length <= 1) {
        lightboxPrev.style.display = 'none';
        lightboxNext.style.display = 'none';
      } else {
        lightboxPrev.style.display = 'block';
        lightboxNext.style.display = 'block';
      }
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    function showLightboxImage(index) {
      currentLightboxIndex = index;
      lightboxImg.src = currentLightboxImages[index];
    }

    if (lightbox && lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);

      lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) closeLightbox();
      });

      if (lightboxPrev) {
        lightboxPrev.addEventListener('click', function () {
          var newIndex = (currentLightboxIndex - 1 + currentLightboxImages.length) % currentLightboxImages.length;
          showLightboxImage(newIndex);
        });
      }

      if (lightboxNext) {
        lightboxNext.addEventListener('click', function () {
          var newIndex = (currentLightboxIndex + 1) % currentLightboxImages.length;
          showLightboxImage(newIndex);
        });
      }

      document.addEventListener('keydown', function (e) {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') {
          closeLightbox();
        } else if (e.key === 'ArrowLeft') {
          var newIndex = (currentLightboxIndex - 1 + currentLightboxImages.length) % currentLightboxImages.length;
          showLightboxImage(newIndex);
        } else if (e.key === 'ArrowRight') {
          var newIndex = (currentLightboxIndex + 1) % currentLightboxImages.length;
          showLightboxImage(newIndex);
        }
      });

      // Delegate click events for dynamically created gallery images
      document.addEventListener('click', function (e) {
        if (e.target.matches('.modal-gallery img')) {
          var index = parseInt(e.target.dataset.lightboxIndex, 10);
          var images = JSON.parse(e.target.dataset.lightboxImages);
          openLightbox(images, index);
        }
      });
    }

    /* =====================================================
       Back to Top Button
    ===================================================== */
    var backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
      // Show button when scrolling down
      window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
      });

      // Scroll to top when clicked
      backToTopBtn.addEventListener('click', function () {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }

  });
})();
