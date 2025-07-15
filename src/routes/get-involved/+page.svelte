<script lang="ts">
	import { notify } from "$lib/utils/prompts";
	import type { ActionData } from "./$types";

    const { form }: { form?: ActionData } = $props();

    if (form) {
        notify(form as {
            title: string;
            message: string;
            color: "success" | "danger" | "info" | "warning";
        });
    }
</script>

<form action="?/register" method="post">
    <div class="container layer-1">
        <div class="row mb-3">
            <div class="col">
                <h1>Get Involved</h1>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col">
                <p class="text-muted">
                    We are always looking for passionate individuals to join our team and contribute to the development of 4Sight Streaming. Whether you are a developer, designer, or have other skills to offer, we would love to hear from you.
                </p>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-md-6">
                <div class="form-floating mb-3">
                    <input type="text" required class="form-control" id="first-name" placeholder="First Name" minlength="3" maxlength="20" name="firstName">
                    <label for="first-name">First Name</label>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-floating mb-3">
                    <input type="text" required class="form-control" id="last-name" placeholder="Last Name" minlength="3" maxlength="20" name="lastName">
                    <label for="last-name">Last Name</label>
                </div>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-md-6">
                <div class="form-floating mb-3">
                    <input type="email" class="form-control" id="email" placeholder="name@example.com" name="email">
                    <label for="email">Email address</label>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-floating mb-3">
                    <input type="text" required class="form-control" id="interest" placeholder="Your Interest" name="interest" list="interests" minlength="3" maxlength="100">
                    <label for="interest">Your Interest</label>
                    <datalist id="interests">
                        <option value="Development"></option>
                        <option value="Design"></option>
                        <option value="Marketing"></option>
                        <option value="Community Management"></option>
                        <option value="Content Creation"></option>
                        <option value="Other"></option>
                    </datalist>
                </div>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col">
                <div class="form-floating mb-3">
                    <textarea class="form-control" required id="experience" placeholder="Describe your experience and how you can contribute" name="experience" minlength="50" maxlength="500"></textarea>
                    <label for="experience">Describe your experience and how you can contribute</label>
                </div>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col text-center w-100">
                <button type="submit" class="btn btn-primary w-100">Submit Application</button>
            </div>
        </div>
    </div>
</form>