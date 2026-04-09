const PageLayout = require('./layout');

class ReadBookPage {
    static render(book, { username = 'Reader' } = {}) {
        const escapedUsername = PageLayout.escapeHtml(username);
        const header = PageLayout.getHeader(`Read ${book.title} - BookStore`, {
            currentPath: `/read/${book.id}`,
            username
        });

        const content = `
            <section class="row justify-content-center">
                <div class="col-lg-9">
                    <div class="detail-panel mb-4">
                        <span class="section-eyebrow">Free Reading</span>
                        <h1 class="display-6 mt-2">${book.title}</h1>
                        <p class="text-muted fs-5 mb-2">by ${book.author}</p>
                        <p class="mb-0">Welcome back, ${escapedUsername}. This free reading page is available because you are logged in.</p>
                    </div>
                    <article class="reader-panel">
                        <p>${book.content}</p>
                        <p>${book.content}</p>
                        <p>${book.content}</p>
                    </article>
                </div>
            </section>
        `;

        return header + content + PageLayout.getFooter();
    }
}

module.exports = ReadBookPage;
