document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;

    function isValidEmail(email) {
        return emailRegex.test(email);
    }

    function isValidPhone(phone) {
        return phoneRegex.test(phone);
    }

    function showFieldError(field, message) {
        const errorSpan = field.parentElement.querySelector('.error-message');
        if (errorSpan) {
            errorSpan.textContent = message;
            errorSpan.classList.remove('hidden');
            errorSpan.classList.add('show');
            field.classList.add('error');
        }
    }

    function clearFieldError(field) {
        const errorSpan = field.parentElement.querySelector('.error-message');
        if (errorSpan) {
            errorSpan.textContent = '';
            errorSpan.classList.add('hidden');
            errorSpan.classList.remove('show');
            field.classList.remove('error');
        }
    }

    function validateForm() {
        let isValid = true;
        const fields = {
            name: form.querySelector('#name'),
            company: form.querySelector('#company'),
            email: form.querySelector('#email'),
            phone: form.querySelector('#phone'),
            serviceType: form.querySelector('#serviceType'),
            message: form.querySelector('#message'),
            privacy: form.querySelector('#privacy'),
        };

        if (!fields.name.value.trim()) {
            showFieldError(fields.name, 'Name is required');
            isValid = false;
        } else if (fields.name.value.trim().length < 2) {
            showFieldError(fields.name, 'Name must be at least 2 characters');
            isValid = false;
        } else {
            clearFieldError(fields.name);
        }

        if (!fields.company.value.trim()) {
            showFieldError(fields.company, 'Company name is required');
            isValid = false;
        } else {
            clearFieldError(fields.company);
        }

        if (!fields.email.value.trim()) {
            showFieldError(fields.email, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(fields.email.value.trim())) {
            showFieldError(fields.email, 'Please enter a valid email');
            isValid = false;
        } else {
            clearFieldError(fields.email);
        }

        if (!fields.phone.value.trim()) {
            showFieldError(fields.phone, 'Phone is required');
            isValid = false;
        } else if (!isValidPhone(fields.phone.value.trim())) {
            showFieldError(fields.phone, 'Please enter a valid phone');
            isValid = false;
        } else {
            clearFieldError(fields.phone);
        }

        if (!fields.serviceType.value) {
            showFieldError(fields.serviceType, 'Please select a service');
            isValid = false;
        } else {
            clearFieldError(fields.serviceType);
        }

        if (!fields.message.value.trim()) {
            showFieldError(fields.message, 'Message is required');
            isValid = false;
        } else if (fields.message.value.trim().length < 10) {
            showFieldError(fields.message, 'Message must be at least 10 characters');
            isValid = false;
        } else {
            clearFieldError(fields.message);
        }

        if (!fields.privacy.checked) {
            errorText.textContent = 'Please agree to the privacy policy';
            errorMessage.classList.remove('hidden');
            isValid = false;
        }

        return isValid;
    }

    function showSuccess() {
        successMessage.classList.remove('hidden');
        errorMessage.classList.add('hidden');

        setTimeout(() => {
            successMessage.classList.add('hidden');
        }, 5000);
    }

    function showError(message) {
        errorText.textContent = message;
        errorMessage.classList.remove('hidden');
        successMessage.classList.add('hidden');
    }

    function resetFormState() {
        form.reset();
        successMessage.classList.add('hidden');
        errorMessage.classList.add('hidden');

        const fields = form.querySelectorAll('input, textarea, select');
        fields.forEach((field) => {
            clearFieldError(field);
        });
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        successMessage.classList.add('hidden');
        errorMessage.classList.add('hidden');

        if (!validateForm()) {
            return;
        }

        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            company: formData.get('company'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            serviceType: formData.get('serviceType'),
            message: formData.get('message'),
        };

        try {
            console.log('Form submitted:', data);
            showSuccess();

            setTimeout(() => {
                resetFormState();
            }, 1500);
        } catch (error) {
            console.error('Form submission error:', error);
            showError('An error occurred. Please try again later.');
        }
    });

    const fields = form.querySelectorAll('input, textarea, select');
    fields.forEach((field) => {
        field.addEventListener('blur', () => {
            const fieldName = field.name;

            if (fieldName === 'name') {
                if (field.value.trim() && field.value.trim().length >= 2) {
                    clearFieldError(field);
                }
            } else if (fieldName === 'company') {
                if (field.value.trim()) {
                    clearFieldError(field);
                }
            } else if (fieldName === 'email') {
                if (field.value.trim() && isValidEmail(field.value.trim())) {
                    clearFieldError(field);
                }
            } else if (fieldName === 'phone') {
                if (field.value.trim() && isValidPhone(field.value.trim())) {
                    clearFieldError(field);
                }
            } else if (fieldName === 'serviceType') {
                if (field.value) {
                    clearFieldError(field);
                }
            } else if (fieldName === 'message') {
                if (field.value.trim() && field.value.trim().length >= 10) {
                    clearFieldError(field);
                }
            }
        });
    });
});
