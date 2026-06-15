document.addEventListener('DOMContentLoaded', () => {
  // 1. THEME SWITCHER
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
  
  const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update button icon if icons are available
    if (themeIcon) {
      if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
      } else {
        themeIcon.className = 'fas fa-moon';
      }
    }

    // Refresh mermaid diagrams if initialized
    if (window.mermaid) {
      // Re-render can be tricky, so we re-render on load or let it parse initial elements
    }
  };

  // Initial theme setup
  setTheme(getPreferredTheme());

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
  }

  // 2. MOBILE SIDEBAR DRAWER
  const hamburgerBtn = document.getElementById('hamburger-toggle');
  const sidebar = document.querySelector('.sidebar');
  
  if (hamburgerBtn && sidebar) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && e.target !== hamburgerBtn) {
        sidebar.classList.remove('open');
      }
    });
  }

  // 3. HIGHLIGHT ACTIVE LINK IN SIDEBAR
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const sidebarLinks = document.querySelectorAll('.sidebar-item a');
  
  sidebarLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.closest('.sidebar-item').classList.add('active');
    }
  });

  // 4. GENERATE TABLE OF CONTENTS (TOC) & SCROLL SPY
  const content = document.querySelector('.content');
  const tocList = document.querySelector('.toc-list');
  
  if (content && tocList) {
    const headings = content.querySelectorAll('h2, h3');
    
    if (headings.length > 0) {
      headings.forEach((heading, index) => {
        // Ensure heading has an ID
        if (!heading.id) {
          heading.id = heading.textContent.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        }

        const li = document.createElement('li');
        li.className = heading.tagName.toLowerCase() === 'h3' ? 'toc-sub-item' : 'toc-item';
        // Add sub-item indentation styling
        if (heading.tagName.toLowerCase() === 'h3') {
          li.style.paddingLeft = '1rem';
        }
        
        const a = document.createElement('a');
        a.href = `#${heading.id}`;
        a.className = 'toc-link';
        a.textContent = heading.textContent;
        
        li.appendChild(a);
        tocList.appendChild(li);
      });

      // SCROLL SPY
      const tocLinks = document.querySelectorAll('.toc-link');
      
      const updateActiveTocLink = () => {
        let activeId = null;
        
        // Find which heading is in view
        headings.forEach(heading => {
          const rect = heading.getBoundingClientRect();
          if (rect.top <= 100) {
            activeId = heading.id;
          }
        });
        
        // If no heading has passed, highlight the first one
        if (!activeId && headings.length > 0) {
          activeId = headings[0].id;
        }

        tocLinks.forEach(link => {
          if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      };

      window.addEventListener('scroll', updateActiveTocLink);
      updateActiveTocLink();
    } else {
      // Hide TOC column if there are no headings
      const tocContainer = document.querySelector('.toc-container');
      if (tocContainer) {
        tocContainer.style.display = 'none';
      }
    }
  }

  // 5. COPY CODE BUTTONS
  const codeBlocks = document.querySelectorAll('.code-wrapper pre');
  
  codeBlocks.forEach(block => {
    // Check if copy button already exists (if generated server-side)
    const wrapper = block.closest('.code-wrapper');
    const header = wrapper ? wrapper.querySelector('.code-header') : null;
    
    if (header) {
      const copyBtn = document.createElement('button');
      copyBtn.className = 'copy-btn';
      copyBtn.textContent = 'Copy';
      
      copyBtn.addEventListener('click', () => {
        const codeText = block.innerText;
        navigator.clipboard.writeText(codeText).then(() => {
          copyBtn.textContent = 'Copied!';
          copyBtn.style.borderColor = 'var(--success-color)';
          copyBtn.style.color = 'var(--success-color)';
          
          setTimeout(() => {
            copyBtn.textContent = 'Copy';
            copyBtn.style.borderColor = 'var(--border-color)';
            copyBtn.style.color = 'var(--text-secondary)';
          }, 2000);
        }).catch(err => {
          console.error('Failed to copy text: ', err);
        });
      });
      
      header.appendChild(copyBtn);
    }
  });

  // 6. INITIALIZE MERMAID DIAGRAMS
  if (typeof mermaid !== 'undefined') {
    mermaid.initialize({
      startOnLoad: true,
      theme: document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'default',
      securityLevel: 'loose',
    });
  }
});
