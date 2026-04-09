const PageLayout = require('./layout');

class AboutPage {
    static render({ username = '' } = {}) {
        const header = PageLayout.getHeader('About - BookStore', {
            currentPath: '/about',
            username
        });

        const content = `
            <section class="row justify-content-center">
                <div class="col-lg-10">
                    <div class="hero-panel p-4 p-md-5 mb-4">
                        <span class="section-eyebrow">About Us</span>
                        <h1 class="display-5 mt-2">A small bookstore built for readers who love discovering something new.</h1>
                        <p class="lead mb-0">We bring together timeless classics, modern favorites, and a simple browsing experience that helps you find your next read fast.</p>
                    </div>
                </div>
            </section>

            <section class="row g-4">
                <div class="col-md-4">
                    <div class="info-card h-100">
                        <h2 class="h4">Curated Picks</h2>
                        <p>Each book in the catalog is chosen to showcase a different style, genre, and reading mood.</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="info-card h-100">
                        <h2 class="h4">Simple Experience</h2>
                        <p>Clean pages, clear details, and quick navigation keep the focus on the books instead of the interface.</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="info-card h-100">
                        <h2 class="h4">Built With Node.js</h2>
                        <p>This project uses Express and server-rendered views to demonstrate a lightweight full-stack bookstore app.</p>
                    </div>
                </div>
            </section>
        `;

        const footer = PageLayout.getFooter();
        return header + content + footer;
    }
}

module.exports = AboutPage;
