const PageLayout = require('./layout');

class LoginPage {
    static render({ error = '', returnTo = '/', username = '' } = {}) {
        const escapedError = PageLayout.escapeHtml(error);
        const escapedReturnTo = PageLayout.escapeHtml(returnTo);
        const header = PageLayout.getHeader('Login - BookStore', {
            currentPath: '/login',
            username
        });

        const content = `
            <section class="row justify-content-center">
                <div class="col-lg-6">
                    <div class="detail-panel">
                        <span class="section-eyebrow">Member Login</span>
                        <h1 class="display-6 mt-2">Sign in to unlock free reading</h1>
                        <p class="lead mb-4">Log in with a name to access free books, keep your cart visible, and personalize your browsing experience.</p>
                        ${error ? `<div class="alert alert-warning">${escapedError}</div>` : ''}
                        <form method="post" action="/login" class="d-grid gap-3">
                            <input type="hidden" name="returnTo" value="${escapedReturnTo}">
                            <div>
                                <label for="username" class="form-label">Your Name</label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    class="form-control form-control-lg"
                                    placeholder="Enter your name"
                                    required
                                >
                            </div>
                            <button type="submit" class="btn btn-primary btn-lg">Login</button>
                        </form>
                    </div>
                </div>
            </section>
        `;

        return header + content + PageLayout.getFooter();
    }
}

module.exports = LoginPage;
