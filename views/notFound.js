const PageLayout = require('./layout');

class NotFoundPage {
    static render({ username = '' } = {}) {
        const header = PageLayout.getHeader('Page Not Found - BookStore', {
            username
        });

        const content = `
            <section class="row justify-content-center text-center">
                <div class="col-lg-7">
                    <div class="hero-panel p-4 p-md-5">
                        <span class="section-eyebrow">404 Error</span>
                        <h1 class="display-4 mt-2">We couldn't find that page.</h1>
                        <p class="lead">The link may be broken, or the page might have been moved.</p>
                        <a href="/" class="btn btn-primary btn-lg mt-3">Return Home</a>
                    </div>
                </div>
            </section>
        `;

        const footer = PageLayout.getFooter();
        return header + content + footer;
    }
}

module.exports = NotFoundPage;
