(function () {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  /**
   * Confetti Click
   */
  function activateConfettiClick() {
    window.addEventListener("click", confettiClick);

    function confettiClick(e) {
      let wp = e.x / window.innerWidth;
      let hp = e.y / window.innerHeight;

      confetti({
        particleCount: 100,
        startVelocity: 30,
        spread: 360,
        zIndex: 2147483647,
        origin: {
          x: wp,
          y: hp,
        },
      });
    }
  }

  /**
   * Party Popper
   */
  function activatePartyPopper() {
    let count = 220;
    let defaults = {
      zIndex: 2147483647,
      origin: { y: 1 },
    };

    function fire(particleRatio, opts) {
      confetti(
        Object.assign({}, defaults, opts, {
          particleCount: Math.floor(count * particleRatio),
        })
      );
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }

  /**
   * School Pride
   */
  function activateSchoolPride() {
    let end = Date.now() + 15 * 1000;
    let colors = ["#bb0000", "#ffffff"];

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        zIndex: 2147483647,
        origin: { x: 0, y: 0.7 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        zIndex: 2147483647,
        origin: { x: 1, y: 0.7 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }

  /**
   * Fireworks
   */
  function activateFireworks() {
    let duration = 15 * 1000;
    let animationEnd = Date.now() + duration;
    let defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 2147483647,
    };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    window.fireworksInterval = setInterval(function () {
      let timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(window.fireworksInterval);
      }

      let particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      );
    }, 250);
  }

  /**
   * Reset
   */
  function resetConfetti() {
    confetti.reset();
    clearInterval(window.fireworksInterval);
  }

  /**
   * Listen for messages from the popup script.
   */
  // browser.runtime...
  chrome.runtime.onMessage.addListener((message) => {
    if (message.command === "confetti-click") {
      activateConfettiClick();
    } else if (message.command === "party-popper") {
      activatePartyPopper();
    } else if (message.command === "fireworks") {
      activateFireworks();
    } else if (message.command === "school-pride") {
      activateSchoolPride();
    } else if (message.command === "confetti-reset") {
      resetConfetti();
    }
  });

})();

