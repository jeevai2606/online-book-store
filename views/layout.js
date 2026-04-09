class PageLayout {
    static escapeHtml(value = '') {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    static getHeader(title, options = {}) {
        const currentPath = options.currentPath || '/';
        const username = options.username || '';
        const escapedUsername = PageLayout.escapeHtml(username);

        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">
            <link rel="stylesheet" href="/css/style.css">
        </head>
        <body>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container">
                    <a class="navbar-brand" href="/">
                        <i class="fas fa-book-open"></i> BookStore
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item">
                                <a class="nav-link ${currentPath === '/' ? 'active' : ''}" href="/">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link ${currentPath === '/about' ? 'active' : ''}" href="/about">About</a>
                            </li>
                            <li class="nav-item">
                                <button type="button" class="nav-link nav-action-btn cart-indicator" id="cart-button">
                                    <i class="fas fa-shopping-cart"></i>
                                    Cart
                                    <span class="cart-count" id="cart-count">0</span>
                                </button>
                            </li>
                            ${username ? `
                                <li class="nav-item">
                                    <span class="nav-link user-greeting"><i class="fas fa-user-circle"></i> ${escapedUsername}</span>
                                </li>
                                <li class="nav-item">
                                    <form method="post" action="/logout" class="logout-form">
                                        <button type="submit" class="nav-link nav-action-btn login-btn">
                                            <i class="fas fa-sign-out-alt"></i>
                                            Logout
                                        </button>
                                    </form>
                                </li>
                            ` : `
                                <li class="nav-item">
                                    <a href="/login" class="nav-link nav-action-btn login-btn ${currentPath === '/login' ? 'active' : ''}">
                                        <i class="fas fa-user"></i>
                                        Login
                                    </a>
                                </li>
                            `}
                        </ul>
                    </div>
                </div>
            </nav>
            <main class="container my-4">`;
    }

    static getFooter() {
        return `</main>
            <footer class="bg-dark text-light py-4 mt-5">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6">
                            <h5><i class="fas fa-book-open"></i> BookStore</h5>
                            <p>Your one-stop destination for amazing books!</p>
                        </div>
                        <div class="col-md-6 text-md-end">
                            <p>&copy; 2024 BookStore. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </footer>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
            <script src="/js/main.js"></script>
        </body>
        </html>`;
    }
}

module.exports = PageLayout;
