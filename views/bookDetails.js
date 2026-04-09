const PageLayout = require('./layout');

class BookDetailsPage {
    static render(book, options = {}) {
        const loggedIn = Boolean(options.loggedIn);
        const username = options.username || '';
        const header = PageLayout.getHeader(`${book.title} - BookStore`, {
            currentPath: `/book/${book.id}`,
            username
        });
        const stockStatus = book.inStock ? 'In Stock' : 'Out of Stock';
        const stockClass = book.inStock ? 'success' : 'danger';
        const formattedPrice = new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 2
        }).format(book.price);
        const titleCover = `
            <div class="title-cover title-cover-detail">
                <span class="title-cover-genre">${PageLayout.escapeHtml(book.genre)}</span>
                <h2 class="title-cover-name">${PageLayout.escapeHtml(book.title)}</h2>
                <p class="title-cover-author">by ${PageLayout.escapeHtml(book.author)}</p>
            </div>
        `;

        const content = `
            <section class="row g-4 align-items-start">
                <div class="col-md-4">
                    <div class="book-cover-panel">
                        ${titleCover}
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="detail-panel">
                        <a href="/" class="btn btn-outline-secondary btn-sm mb-3">
                            <i class="fas fa-arrow-left"></i> Back to books
                        </a>
                        <h1 class="display-6">${book.title}</h1>
                        <p class="text-muted fs-5 mb-3">by ${book.author}</p>
                        <div class="d-flex flex-wrap gap-2 mb-4">
                            <span class="badge bg-primary">${book.genre}</span>
                            <span class="badge bg-warning text-dark"><i class="fas fa-star"></i> ${book.rating}</span>
                            <span class="badge bg-${stockClass}">${stockStatus}</span>
                            ${book.isFree ? '<span class="badge bg-success">Free to Read</span>' : ''}
                        </div>
                        <p class="book-description">${book.description}</p>
                        <div class="price-panel mt-4">
                            <span class="price-label">Price</span>
                            <div class="price-value">${formattedPrice}</div>
                        </div>
                        ${book.isFree ? `
                            <div class="mt-4">
                                <a href="${loggedIn ? `/read/${book.id}` : `/login?returnTo=/read/${book.id}`}" class="btn btn-success">
                                    ${loggedIn ? 'Start Reading Free' : 'Login to Read This Free Book'}
                                </a>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </section>
        `;

        const footer = PageLayout.getFooter();
        return header + content + footer;
    }
}

module.exports = BookDetailsPage;
