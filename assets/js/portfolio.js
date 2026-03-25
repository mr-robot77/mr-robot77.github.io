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
    if (hash === 'about' || hash === 'projects') {
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
       Project Detail Modal
    ===================================================== */
    var modal      = document.getElementById('project-modal');
    var modalClose = document.getElementById('modal-close');

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
        previewEl.style.background = data.gradient || '#4e65fd';
        previewEl.innerHTML    = '';
        if (data.image) {
          var img = document.createElement('img');
          img.src = data.image;
          img.alt = data.title || '';
          img.className = 'cases__pic';
          previewEl.appendChild(img);
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

  });
})();
