<script lang="ts">
	import { Random } from 'ts-utils/math';
	import { onMount, type Snippet } from 'svelte';
	import { SimpleEventEmitter } from 'ts-utils/event-emitter';

	const id = Random.uuid();

	const em = new SimpleEventEmitter<'hide' | 'show'>();


	let self: HTMLDivElement;
    let email = $state('');
    let firstName = $state('');
    let lastName = $state('');

	const getModal = async () => {
		return import('bootstrap').then((bs) => {
			return bs.Modal.getInstance(self) || new bs.Modal(self);
		});
	};

	export const on = em.on.bind(em);
	export const once = em.once.bind(em);

	export const show = async () => {
        window.localStorage.setItem('newsletter-seen', 'true');
		em.emit('show');
		const modal = await getModal();
		modal.show();
	};

	export const hide = async () => {
		em.emit('hide');
		const modal = await getModal();
		modal.hide();
	};

    const join = () => {
        return fetch('/newsletter/join', {
            method: 'POST',
            body: JSON.stringify({
                email,
                firstName,
                lastName,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
    };

	onMount(() => {
		const onshow = () => em.emit('show');
		const onhide = () => em.emit('hide');

		self.addEventListener('hidden.bs.modal', onhide);

		self.addEventListener('shown.bs.modal', onshow);


        if (window.localStorage.getItem('newsletter-seen') !== 'true') {
            window.localStorage.setItem('newsletter-seen', 'true');
            setTimeout(show, 3000);
        }

        const onkeydown = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'Escape':
                    hide();
                    break;
                case 'Enter':
                    if (self.classList.contains('show')) {
                        join();
                    }
                    break;
            }
        };

		return () => {
			self.removeEventListener('hidden.bs.modal', onhide);
			self.removeEventListener('shown.bs.modal', onshow);
            document.removeEventListener('keydown', onkeydown);
		};
	});
</script>

<div bind:this={self} {id} class="modal fade" aria-modal="true" role="dialog" tabindex="-1">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">
                    Join the 4sight Newsletter!
                </h5>
				<button
					class="btn-close close-modal"
					aria-label="Close"
					data-bs-dismiss="modal"
					type="button"
				></button>
			</div>
			<div class="modal-body">
                <div class="container">
                    <div class="row mb-3">
                        <label for="newsletter-email-{id}">
                            Email
                        </label>
                        <input type="email" name="newsletter-email-{id}" id="newsletter-email-{id}" class="transparent-input" placeholder="Enter your email" bind:value={email} />
                    </div>
                    <div class="row mb-3">
                        <label for="newsletter-first-name-{id}">
                            First Name
                        </label>
                        <input type="text" name="newsletter-first-name-{id}" id="newsletter-first-name-{id}" class="transparent-input" placeholder="Enter your name" bind:value={firstName} />
                    </div>
                    <div class="row mb-3">
                        <label for="newsletter-last-name-{id}">
                            Last Name
                        </label>
                        <input type="text" name="newsletter-last-name-{id}" id="newsletter-last-name-{id}" class="transparent-input" placeholder="Enter your last name" bind:value={lastName} />
                    </div>
                    <div class="row mb-3">
                        <p class="message">
                            Join our newsletter to stay updated with the latest news, features, and updates from 4sight. We promise not to spam you and will only send relevant information.
                            <br>
                            <br>
                            <span class="text-muted">
                                Your data is safe with us, we do not sell your information to third parties.
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" onclick={join}>
                    Join
                </button>
            </div>
		</div>
	</div>
</div>

<style>
    .modal-content {
        background-image: url('/assets/newsletter.jpg');
        background-size: cover;
        background-position: center;
        height: 80vh;
    }

    .modal-content::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background-color: rgba(0, 0, 0, 0.5); /* <- tint color here */
        z-index: 0;
    }

    .modal-content > * {
        position: relative;
        z-index: 1;
    }

    .transparent-input {
        width: 100%;
        height: 50px;
        opacity: 0.8;
        border: none;
        color: white;
        font-size: 1.5rem;
        padding: 10px;
    }

    .modal-header {
        /* background-color: rgba(0, 0, 0, 0.5); */
        border-radius: 0;
    }
    
    .message {
        /* background-color: rgba(59, 59, 59); */
        /* opacity: 0.8; */
        z-index: 10;
        width: 100%;
    }
</style>
