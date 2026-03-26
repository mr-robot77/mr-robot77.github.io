/* project.js — Lightbox and back-to-top for individual project pages */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* =====================================================
       Lightbox for Gallery Images
    ===================================================== */
    var lightbox      = document.getElementById('lightbox');
    var lightboxImg   = document.getElementById('lightbox-img');
    var lightboxClose = document.getElementById('lightbox-close');
    var lightboxPrev  = document.getElementById('lightbox-prev');
    var lightboxNext  = document.getElementById('lightbox-next');
    var galleryImgs   = Array.from(document.querySelectorAll('.project-gallery-img'));
    var currentIndex  = 0;

    function openLightbox(index) {
      currentIndex = index;
      lightboxImg.src = galleryImgs[index].src;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';

      if (galleryImgs.length <= 1) {
        if (lightboxPrev) lightboxPrev.style.display = 'none';
        if (lightboxNext) lightboxNext.style.display = 'none';
      } else {
        if (lightboxPrev) lightboxPrev.style.display = 'block';
        if (lightboxNext) lightboxNext.style.display = 'block';
      }
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    function showImage(index) {
      currentIndex = (index + galleryImgs.length) % galleryImgs.length;
      lightboxImg.src = galleryImgs[currentIndex].src;
    }

    galleryImgs.forEach(function (img, idx) {
      img.addEventListener('click', function () { openLightbox(idx); });
    });

    if (lightbox) {
      if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
      lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) closeLightbox();
      });
      if (lightboxPrev) lightboxPrev.addEventListener('click', function () { showImage(currentIndex - 1); });
      if (lightboxNext) lightboxNext.addEventListener('click', function () { showImage(currentIndex + 1); });

      document.addEventListener('keydown', function (e) {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') { closeLightbox(); }
        else if (e.key === 'ArrowLeft')  { showImage(currentIndex - 1); }
        else if (e.key === 'ArrowRight') { showImage(currentIndex + 1); }
      });
    }

    /* =====================================================
       Back to Top Button
    ===================================================== */
    var backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
      window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
      });

      backToTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

  });
})();
