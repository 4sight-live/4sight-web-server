export namespace Parallax {
	const elements: HTMLElement[] = [];
	let doAnimate = false;
	let deinit = () => {};

	export const init = () => {
		deinit();
		document.querySelectorAll<HTMLElement>('.parallax').forEach((el) => {
			elements.push(el);

			el.style.transform = `translateY(${0}px)`; // Initialize transform
			el.style.willChange = 'transform'; // Optimize for performance
			el.style.transition = 'transform 0.1s ease-out'; // Smooth transition
		});

		const load = () => {
			init();
			animate();
		};
		const resize = () => {
			init();
		};
		const scroll = () => {
			// no-op, updateParallax already runs in a loop
		};
		window.addEventListener('load', load);
		window.addEventListener('resize', resize);
		window.addEventListener('scroll', scroll);
		deinit = () => {
			doAnimate = false;
			window.removeEventListener('load', load);
			window.removeEventListener('resize', resize);
			window.removeEventListener('scroll', scroll);
		};
		doAnimate = true;
		animate();

		return deinit;
	};

	export const animate = () => {
		if (!doAnimate) return;
		const viewportHeight = window.innerHeight;
		const scrollY = window.scrollY;

		for (const p of elements) {
			const offset = Number(p.dataset.offset) || 0;
			const rect = p.getBoundingClientRect();
			// is this element visible?
			if (rect.top + offset < viewportHeight && rect.bottom - offset > 0) {
				const top = rect.top + scrollY - offset;
				// const bottom = rect.bottom + scrollY + offset;

				// The total displacement is how far the element should move when object is going from top to bottom of the viewport to the top
				// const totalDisplacement = (bottom - top) + (offset * 2);
				// Calculate the percentage of the viewport height that the element occupies
				const percentage = (rect.height + offset * 2) / viewportHeight;
				// Calculate the new position based on the scroll position and the percentage of the viewport height
				const newPosition = (scrollY - top) * percentage;
				p.style.transform = `translateY(${newPosition}px)`;
				p.style.willChange = 'transform'; // Ensure willChange is set for performance
			} else {
				p.style.transform = `translateY(0px)`;
				p.style.willChange = 'auto'; // Reset willChange to avoid unnecessary GPU usage
			}
		}

		requestAnimationFrame(animate);
	};
}
