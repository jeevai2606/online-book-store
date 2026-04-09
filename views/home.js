const PageLayout = require('./layout');

class HomePage {
    static render(books, options = {}) {
        const genres = options.genres || [];
        const filters = options.filters || {};
        const totalBooks = options.totalBooks || books.length;
        const loggedIn = Boolean(options.loggedIn);
        const username = options.username || '';
        const selectedGenre = filters.genre || '';
        const search = filters.search || '';
        const freeOnly = Boolean(filters.freeOnly);
        const header = PageLayout.getHeader('Home - BookStore', {
            currentPath: '/',
            username
        });
        const formatPrice = (price) =>
            new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                maximumFractionDigits: 2
            }).format(price);
        const renderTitleCover = (book) => `
            <div class="title-cover title-cover-card">
                <span class="title-cover-genre">${PageLayout.escapeHtml(book.genre)}</span>
                <h3 class="title-cover-name">${PageLayout.escapeHtml(book.title)}</h3>
                <p class="title-cover-author">by ${PageLayout.escapeHtml(book.author)}</p>
            </div>
        `;

        const genreSummary = genres.map((genre) => {
            const count = books.filter((book) => book.genre === genre).length;
            return `<span class="genre-pill">${genre} <strong>${count}</strong></span>`;
        }).join('');
        
        const content = `
            <section class="hero-panel p-4 p-md-5 mb-4">
                <span class="section-eyebrow">Explore by Genre</span>
                <h1 class="display-4 mt-2">Find exactly what you want to read</h1>
                <p class="lead mb-3">Browse more than ${totalBooks} books across multiple genres, filter the catalog, and unlock free reading when you log in.</p>
                <div class="genre-pills">${genreSummary}</div>
            </section>

            <section class="filter-panel mb-4">
                <form method="get" action="/" class="row g-3 align-items-end">
                    <div class="col-md-4">
                        <label for="search" class="form-label">Search by title or author</label>
                        <input id="search" name="search" class="form-control" value="${search}" placeholder="Search books">
                    </div>
                    <div class="col-md-3">
                        <label for="genre" class="form-label">Genre</label>
                        <select id="genre" name="genre" class="form-select">
                            <option value="">All genres</option>
                            ${genres.map((genre) => `
                                <option value="${genre}" ${genre === selectedGenre ? 'selected' : ''}>${genre}</option>
                            `).join('')}
                        </select>
                    </div>
                    <div class="col-md-2">
                        <div class="form-check filter-check">
                            <input id="free" name="free" type="checkbox" class="form-check-input" value="true" ${freeOnly ? 'checked' : ''}>
                            <label for="free" class="form-check-label">Free books only</label>
                        </div>
                    </div>
                    <div class="col-md-3 d-flex gap-2">
                        <button type="submit" class="btn btn-dark flex-grow-1">Apply Filter</button>
                        <a href="/" class="btn btn-outline-secondary">Reset</a>
                    </div>
                </form>
            </section>

            <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                <p class="mb-0 text-muted">Showing ${books.length} books${loggedIn ? ` for ${PageLayout.escapeHtml(username)}` : ''}</p>
                <span class="small text-muted">${loggedIn ? 'Logged in users can open free books instantly.' : 'Log in to read free books online.'}</span>
            </div>
            
            <div class="row">
                ${books.map(book => `
                    <div class="col-md-3 mb-4">
                        <div class="card h-100 book-card">
                            ${renderTitleCover(book)}
                            <div class="card-body">
                                <h5 class="card-title">${book.title}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">by ${book.author}</h6>
                                <p class="card-text small">${book.description.substring(0, 100)}...</p>
                                <div class="d-flex flex-wrap gap-2 mb-3">
                                    <span class="badge bg-secondary">${book.genre}</span>
                                    ${book.isFree ? '<span class="badge bg-success">Free to Read</span>' : ''}
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <span class="h5 mb-0 text-primary">${formatPrice(book.price)}</span>
                                    <span class="badge bg-warning text-dark">
                                        <i class="fas fa-star"></i> ${book.rating}
                                    </span>
                                </div>
                            </div>
                            <div class="card-footer bg-transparent">
                                <div class="d-grid gap-2">
                                    <a href="/book/${book.id}" class="btn btn-primary btn-sm">View Details</a>
                                    ${book.isFree
                                        ? `<a href="${loggedIn ? `/read/${book.id}` : `/login?returnTo=/read/${book.id}`}" class="btn btn-success btn-sm">${loggedIn ? 'Read Now' : 'Login to Read Free'}</a>`
                                        : ''}
                                    <button
                                        type="button"
                                        class="btn btn-outline-dark btn-sm add-to-cart-btn"
                                        data-book-id="${book.id}"
                                        data-book-title="${book.title}"
                                        data-book-price="${formatPrice(book.price)}"
                                    >
                                        <i class="fas fa-cart-plus"></i> Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            ${books.length === 0 ? `
                <div class="alert alert-light border mt-4">
                    No books matched your filter. Try another genre, remove the free-only filter, or search with a different title.
                </div>
            ` : ''}
        `;
        
        const footer = PageLayout.getFooter();
        return header + content + footer;
    }
}

module.exports = HomePage;
