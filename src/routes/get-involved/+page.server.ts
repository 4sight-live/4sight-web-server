import { Newsletter } from '$lib/server/structs/newsletter';
import { z } from 'zod';

export const actions = {
	register: async (event) => {
		const data = await event.request.formData();

		const email = z.string().email().safeParse(data.get('email'));
		const firstName = z.string().min(3).max(20).safeParse(data.get('firstName'));
		const lastName = z.string().min(3).max(20).safeParse(data.get('lastName'));
		const interest = z.string().min(3).max(100).safeParse(data.get('interest'));
		const experience = z.string().min(50).max(500).safeParse(data.get('experience'));

		if (!email.success) {
			return {
				title: 'Invalid email',
				message: 'Please provide a valid email address.',
				color: 'danger'
			};
		}

		if (!firstName.success) {
			return {
				title: 'Invalid first name',
				message: 'First name must be between 3 and 20 characters.',
				color: 'danger'
			};
		}

		if (!lastName.success) {
			return {
				title: 'Invalid last name',
				message: 'Last name must be between 3 and 20 characters.',
				color: 'danger'
			};
		}

		if (!interest.success) {
			return {
				title: 'Invalid interest',
				message: 'Interest must be between 3 and 100 characters.',
				color: 'danger'
			};
		}

		if (!experience.success) {
			return {
				title: 'Invalid experience',
				message: 'Experience must be between 50 and 500 characters.',
				color: 'danger'
			};
		}

		await Newsletter.TeamOnboarding.new({
			email: email.data,
			firstName: firstName.data,
			lastName: lastName.data,
			interest: interest.data,
			experience: experience.data
		}).unwrap();

		return {
			title: 'Success',
			message:
				'Thank you for your interest in joining our team! We will review your application and get back to you soon.',
			color: 'success'
		};
	}
};
