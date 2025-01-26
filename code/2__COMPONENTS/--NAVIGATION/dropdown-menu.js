// Navigation
// Dropdown Menu
document.addEventListener('DOMContentLoaded', () => {
  // Select all dropdown containers
  const dropdowns = Array.from(document.querySelectorAll('.nav--dropdown'));

  if (!dropdowns.length) {
    console.error('No dropdown elements found in the DOM!');
    return;
  }

  // Select the main navigation container once
  const navigation = document.querySelector('.navigation');

  if (!navigation) {
    console.error('Navigation container (.navigation) not found!');
    return;
  }

  // Initialize dropdown data with clearer naming
  const dropdownData = dropdowns
    .map((dropdown) => {
      // Elements that control the dropdown interaction
      const dropdownToggle = dropdown.querySelector('.btn--nav-dropdown');
      const dropdownMenu = dropdown.querySelector('.nav--dropdown-menu');
      const dropdownIcon = dropdown.querySelector('.icon--svg.is--nav');

      if (!dropdownToggle || !dropdownMenu || !dropdownIcon) {
        console.warn(
          'Some required elements (dropdownToggle, dropdownMenu, dropdownIcon) are missing in a .nav--dropdown!'
        );
        return null;
      }

      return {
        dropdown,
        toggle: dropdownToggle, // Button that triggers dropdown
        menu: dropdownMenu, // Content container that shows/hides
        icon: dropdownIcon, // Rotation indicator for dropdown state
        isOpen: false, // Tracks if menu is visible
        animating: false, // Prevents interaction during animations
      };
    })
    .filter((d) => d !== null);

  /**
   * Utility function to create a GSAP timeline for opening a dropdown
   */
  const createOpenTimeline = (d) => {
    const tl = gsap.timeline({
      onStart: () => {
        d.animating = true;
      },
      onComplete: () => {
        d.animating = false;
      },
    });

    tl.fromTo(
      d.dropdownMenu,
      { opacity: 0, height: 0 },
      { opacity: 1, height: 'auto', duration: 0.3, ease: 'power2.out' }
    )
      .to(d.dropdownIcon, { rotation: 180, duration: 0.3, ease: 'power2.out' }, '<')
      .to(
        d.dropdownToggle,
        { backgroundColor: 'var(--color-secondary--darkest)', duration: 0.3 },
        '<'
      )
      .to(
        navigation,
        {
          borderBottomLeftRadius: '0',
          borderBottomRightRadius: '0',
          duration: 0.3,
          ease: 'power2.out',
        },
        '<'
      );

    return tl;
  };

  /**
   * Utility function to create a GSAP timeline for closing a dropdown
   */
  const createCloseTimeline = (d) => {
    const tl = gsap.timeline({
      onStart: () => {
        d.animating = true;
      },
      onComplete: () => {
        d.animating = false;
      },
    });

    tl.fromTo(
      d.dropdownMenu,
      { opacity: 1, height: d.dropdownMenu.scrollHeight },
      { opacity: 0, height: 0, duration: 0.3, ease: 'power2.in' }
    )
      .to(d.dropdownIcon, { rotation: 0, duration: 0.3, ease: 'power2.in' }, '<')
      .to(d.dropdownToggle, { backgroundColor: '', duration: 0.3 }, '<')
      .to(
        navigation,
        {
          borderBottomLeftRadius: '1rem',
          borderBottomRightRadius: '1rem',
          duration: 0.3,
          ease: 'power2.in',
        },
        '<'
      );

    return tl;
  };

  /**
   * Closes all open dropdowns except the specified one
   */
  const closeAllDropdowns = (except = null) => {
    dropdownData.forEach((d) => {
      if (d !== except && d.isOpen && !d.animating) {
        closeDropdown(d);
      }
    });
  };

  /**
   * Opens a specific dropdown
   */
  const openDropdown = (d) => {
    createOpenTimeline(d).play();
    d.isOpen = true;
  };

  /**
   * Closes a specific dropdown
   */
  const closeDropdown = (d) => {
    createCloseTimeline(d).play();
    d.isOpen = false;
  };

  // Attach event listeners to each dropdown toggle
  dropdownData.forEach((d) => {
    d.toggle.addEventListener('click', (event) => {
      if (d.animating) return; // Prevent action if animating

      // Toggle the dropdown
      if (d.isOpen) {
        closeDropdown(d);
      } else {
        closeAllDropdowns(d); // Close others before opening
        openDropdown(d);
      }
    });
  });

  // Event listener to close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    dropdownData.forEach((d) => {
      if (d.isOpen && !d.animating) {
        const clickedInside = d.dropdown.contains(e.target) || d.toggle.contains(e.target);
        if (!clickedInside) {
          closeDropdown(d);
        }
      }
    });
  });

  // Close dropdowns when pressing the Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllDropdowns();
    }
  });
});
