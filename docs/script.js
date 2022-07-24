const $firefoxLink = document.getElementById("js-firefox-link");
const $chromeLink = document.getElementById("js-chrome-link");

$firefoxLink.addEventListener("mouseenter", firefoxConfetti);
$chromeLink.addEventListener("mouseenter", chromeConfetti);

function firefoxConfetti(e) {
	let wp = e.x / window.innerWidth;
	let hp = e.y / window.innerHeight;

	confetti({
		particleCount: 96,
		startVelocity: 36,
		spread: 360,
		colors: ["#ff3f41", "#ff3f41", "#ffc02b", "#ffc02b", "#7e5ef3"],
		origin: {
			x: wp,
			y: hp
		}
	});
}

function chromeConfetti(e) {
	let wp = e.x / window.innerWidth;
	let hp = e.y / window.innerHeight;

	confetti({
		particleCount: 96,
		startVelocity: 36,
		spread: 360,
		colors: [
			"#259645",
			"#259645",
			"#fbc116",
			"#fbc116",
			"#de362a",
			"#de362a",
			"#1a73e8"
		],
		origin: {
			x: wp,
			y: hp
		}
	});
}

const $confettiClick = document.getElementById("confetti-click");
const $partyPopper = document.getElementById("party-popper");
const $fireworks = document.getElementById("fireworks");
const $schoolPride = document.getElementById("school-pride");
const confettiClickFn = confettiClick.bind(this);

$confettiClick.addEventListener("click", activateConfettiClick);
$partyPopper.addEventListener("click", activatePartyPopper);
$fireworks.addEventListener("click", activateFireworks);
$schoolPride.addEventListener("click", activateSchoolPride);

/**
 * Confetti Click
 */
function activateConfettiClick(e) {
	if ($confettiClick.classList.contains("confetti-button--active")) {
		$confettiClick.classList.remove("confetti-button--active");
		window.removeEventListener("click", confettiClickFn);
	} else {
		$confettiClick.classList.add("confetti-button--active");
		window.addEventListener("click", confettiClickFn);
	}
}

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
			y: hp
		}
	});
}

/**
 * Party Popper
 */
function activatePartyPopper() {
	let count = 220;
	let defaults = {
		zIndex: 2147483647,
		origin: { y: 1 }
	};

	function fire(particleRatio, opts) {
		confetti(
			Object.assign({}, defaults, opts, {
				particleCount: Math.floor(count * particleRatio)
			})
		);
	}

	fire(0.25, {
		spread: 26,
		startVelocity: 55
	});
	fire(0.2, {
		spread: 60
	});
	fire(0.35, {
		spread: 100,
		decay: 0.91,
		scalar: 0.8
	});
	fire(0.1, {
		spread: 120,
		startVelocity: 25,
		decay: 0.92,
		scalar: 1.2
	});
	fire(0.1, {
		spread: 120,
		startVelocity: 45
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
			colors: colors
		});
		confetti({
			particleCount: 2,
			angle: 120,
			spread: 55,
			zIndex: 2147483647,
			origin: { x: 1, y: 0.7 },
			colors: colors
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
		zIndex: 2147483647
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
				origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
			})
		);
		confetti(
			Object.assign({}, defaults, {
				particleCount,
				origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
			})
		);
	}, 250);
}

let acc = document.getElementsByClassName("accordion");
let i;

for (i = 0; i < acc.length; i++) {
	acc[i].addEventListener("click", function () {
		this.classList.toggle("active");
		var panel = this.nextElementSibling;
		if (panel.style.maxHeight) {
			panel.style.maxHeight = null;
		} else {
			panel.style.maxHeight = panel.scrollHeight + "px";
		}
	});
}
