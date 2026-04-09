const express = require('express');
const path = require('path');
const fs = require('fs');

const HomePage = require('./views/home');
const BookDetailsPage = require('./views/bookDetails');
const AboutPage = require('./views/about');
const LoginPage = require('./views/login');
const NotFoundPage = require('./views/notFound');
const ReadBookPage = require('./views/readBook');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function getBooks() {
    const dataPath = path.join(__dirname, 'data', 'books.json');
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
}

function parseCookies(req) {
    const cookieHeader = req.headers.cookie || '';
    return cookieHeader.split(';').reduce((cookies, entry) => {
        const [rawKey, ...rest] = entry.trim().split('=');
        if (!rawKey) {
            return cookies;
        }

        cookies[rawKey] = decodeURIComponent(rest.join('='));
        return cookies;
    }, {});
}

function getCurrentUser(req) {
    const cookies = parseCookies(req);
    return cookies.bookstore_user || '';
}

function isLoggedIn(req) {
    return Boolean(getCurrentUser(req));
}

app.get('/', (req, res) => {
    const data = getBooks();
    const genres = [...new Set(data.books.map((book) => book.genre))].sort();
    const selectedGenre = req.query.genre || '';
    const search = (req.query.search || '').trim();
    const freeOnly = req.query.free === 'true';
    const normalizedSearch = search.toLowerCase();

    const filteredBooks = data.books.filter((book) => {
        const matchesGenre = !selectedGenre || book.genre === selectedGenre;
        const matchesSearch = !normalizedSearch ||
            book.title.toLowerCase().includes(normalizedSearch) ||
            book.author.toLowerCase().includes(normalizedSearch);
        const matchesFree = !freeOnly || book.isFree;

        return matchesGenre && matchesSearch && matchesFree;
    });

    res.send(HomePage.render(filteredBooks, {
        genres,
        filters: {
            genre: selectedGenre,
            search,
            freeOnly
        },
        totalBooks: data.books.length,
        loggedIn: isLoggedIn(req),
        username: getCurrentUser(req)
    }));
});

app.get('/book/:id', (req, res) => {
    const data = getBooks();
    const bookId = Number.parseInt(req.params.id, 10);
    const book = data.books.find((item) => item.id === bookId);

    if (!book) {
        return res.status(404).send(NotFoundPage.render({
            username: getCurrentUser(req)
        }));
    }

    return res.send(BookDetailsPage.render(book, {
        loggedIn: isLoggedIn(req),
        username: getCurrentUser(req)
    }));
});

app.get('/about', (req, res) => {
    res.send(AboutPage.render({
        username: getCurrentUser(req)
    }));
});

app.get('/login', (req, res) => {
    res.send(LoginPage.render({
        error: req.query.error || '',
        returnTo: req.query.returnTo || '/',
        username: getCurrentUser(req)
    }));
});

app.post('/login', (req, res) => {
    const username = (req.body.username || '').trim();
    const returnTo = req.body.returnTo || '/';

    if (!username) {
        return res.redirect(`/login?error=${encodeURIComponent('Please enter your name to continue.')}&returnTo=${encodeURIComponent(returnTo)}`);
    }

    res.setHeader('Set-Cookie', `bookstore_user=${encodeURIComponent(username)}; Path=/; HttpOnly; Max-Age=604800; SameSite=Lax`);
    return res.redirect(returnTo);
});

app.post('/logout', (req, res) => {
    res.setHeader('Set-Cookie', 'bookstore_user=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax');
    res.redirect('/');
});

app.get('/read/:id', (req, res) => {
    const data = getBooks();
    const bookId = Number.parseInt(req.params.id, 10);
    const book = data.books.find((item) => item.id === bookId);

    if (!book || !book.isFree) {
        return res.status(404).send(NotFoundPage.render({
            username: getCurrentUser(req)
        }));
    }

    if (!isLoggedIn(req)) {
        return res.redirect(`/login?error=${encodeURIComponent('Please log in to read free books.')}&returnTo=${encodeURIComponent(`/read/${bookId}`)}`);
    }

    return res.send(ReadBookPage.render(book, {
        username: getCurrentUser(req)
    }));
});

app.use((req, res) => {
    res.status(404).send(NotFoundPage.render({
        username: getCurrentUser(req)
    }));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('BookStore is ready!');
});
