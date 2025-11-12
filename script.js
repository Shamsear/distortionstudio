/* DISTORTION_STUDIO — Brutalist Glitch Interactions */
(function() {
  'use strict';
  
  console.log('Script loading...');
  
  // Helper functions
  function $(selector, context) {
    return (context || document).querySelector(selector);
  }
  
  function $$(selector, context) {
    return Array.from((context || document).querySelectorAll(selector));
  }
  
  // Year
  var yearEl = $('#year'); 
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Cube Navigation
  $$('.cube').forEach(function(cube) {
    cube.addEventListener('click', function() {
      var target = cube.dataset.nav;
      var el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Add glitch effect to viewport
        document.body.style.filter = 'invert(1)';
        setTimeout(function() { document.body.style.filter = 'none'; }, 100);
      }
    });
  });

  // CTA Glitch Buttons - All contact CTAs
  $$('[data-action="contact"]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  // Form submission handler
  var form = $('.contact-form-brutal');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = form.querySelector('.submit-brutal');
      var btnSpan = btn.querySelector('span');
      var originalText = btnSpan.textContent;
      
      // Simulate submission
      btnSpan.textContent = 'TRANSMITTING...';
      btn.disabled = true;
      
      setTimeout(function() {
        btnSpan.textContent = 'TRANSMISSION_SENT';
        btn.style.background = '#00ff00';
        
        // Reset after 3 seconds
        setTimeout(function() {
          btnSpan.textContent = originalText;
          btn.style.background = '';
          btn.disabled = false;
          form.reset();
        }, 3000);
      }, 1500);
    });
  }

  // Matrix Rain Canvas
  (function initMatrix() {
    var canvas = document.getElementById('matrixRain');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    var w, h, columns, drops = [];
    var fontSize = 14;
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+{}[]|;:<>?';
    
    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      columns = Math.floor(w / fontSize);
      drops.length = columns;
      for (var i = 0; i < columns; i++) {
        if (!drops[i]) drops[i] = Math.random() * h / fontSize;
      }
    }
    
    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#00ff00';
      ctx.font = fontSize + 'px monospace';
      
      for (var i = 0; i < drops.length; i++) {
        var char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > h && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }
    
    window.addEventListener('resize', resize);
    resize();
    setInterval(draw, 35);
  })();

  // Work Cards Modal
  (function initWorkModal() {
    var overlay = $('[data-modal-overlay]');
    var modal = $('[data-modal]');
    var closeBtn = $('[data-modal-close]');
    var title = $('[data-modal-title]');
    var modalCTA = modal ? modal.querySelector('[data-action="contact"]') : null;
    
    if (!overlay || !modal) return;
    
    var projectDetails = {
      'ecom': 'E-COMMERCE REBRAND',
      'fintech': 'FINTECH DASHBOARD', 
      'culture': 'CULTURAL PLATFORM',
      'saas': 'SAAS ONBOARDING',
      'experimental': 'EXPERIMENTAL MICROSITE'
    };
    
    function open(projectName) {
      if (title) title.textContent = projectDetails[projectName] || projectName.toUpperCase();
      overlay.hidden = false;
      requestAnimationFrame(function() {
        overlay.setAttribute('data-open', '');
      });
      document.addEventListener('keydown', onEsc);
    }
    
    function close() {
      overlay.removeAttribute('data-open');
      setTimeout(function() { overlay.hidden = true; }, 300);
      document.removeEventListener('keydown', onEsc);
    }
    
    function onEsc(e) {
      if (e.key === 'Escape') close();
    }
    
    // Make work cards clickable
    $$('.work-card').forEach(function(card) {
      card.addEventListener('click', function() {
        var project = card.dataset.project;
        open(project);
      });
    });
    
    // Modal CTA button
    if (modalCTA) {
      modalCTA.addEventListener('click', function() {
        close();
        var contactEl = document.getElementById('contact');
        if (contactEl) {
          contactEl.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
    
    if (closeBtn) {
      closeBtn.addEventListener('click', close);
    }
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) close();
    });
  })();

  // Typing Effect
  (function initTyping() {
    var typing = $('.typing');
    if (!typing) return;
    
    var text = typing.textContent;
    typing.textContent = '';
    var i = 0;
    
    function type() {
      if (i < text.length) {
        typing.innerHTML = text.slice(0, i + 1);
        // Re-add highlights
        typing.innerHTML = typing.innerHTML.replace(/anti-patterns/g, '<span class="highlight">anti-patterns</span>');
        typing.innerHTML = typing.innerHTML.replace(/convert/g, '<span class="highlight">convert</span>');
        i++;
        setTimeout(type, 50);
      }
    }
    
    setTimeout(type, 1000);
  })();
  
  // Glitch on scroll
  var scrollTimer;
  window.addEventListener('scroll', function() {
    document.body.setAttribute('data-state', 'scrolling');
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(function() {
      document.body.setAttribute('data-state', 'idle');
    }, 150);
  }, { passive: true });
  
  // Random glitches
  setInterval(function() {
    if (Math.random() > 0.95) {
      document.body.style.transform = 'translateX(' + (Math.random() * 4 - 2) + 'px)';
      setTimeout(function() {
        document.body.style.transform = 'none';
      }, 100);
    }
  }, 3000);
  
  // Process phases - make them clickable
  $$('.phase').forEach(function(phase, index) {
    phase.style.cursor = 'pointer';
    phase.addEventListener('click', function() {
      // Scroll to contact with the phase info
      var contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
      
      // Pre-fill the message field with phase context
      var messageField = document.querySelector('textarea[name="message"]');
      if (messageField) {
        var phaseNames = ['DISRUPT', 'DISTORT', 'DEVELOP', 'DELIVER'];
        messageField.value = 'Interested in Phase ' + (index + 1) + ': ' + phaseNames[index];
        messageField.focus();
      }
    });
  });
  
  // Make floating text clickable to trigger random glitch
  $$('.floating-text span').forEach(function(text) {
    text.style.cursor = 'pointer';
    text.addEventListener('click', function() {
      // Trigger intense glitch effect
      document.body.style.filter = 'hue-rotate(180deg) invert(1)';
      document.body.style.transform = 'scale(1.02) rotate(1deg)';
      setTimeout(function() {
        document.body.style.filter = 'none';
        document.body.style.transform = 'none';
      }, 200);
    });
  });
  
  console.log('Script loaded successfully!');
})();
