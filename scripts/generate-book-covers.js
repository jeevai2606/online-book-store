const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const imagesDir = path.join(rootDir, 'public', 'images');
const dataPath = path.join(rootDir, 'data', 'books.json');

const coverConfigs = [
  {
    key: 'Hidden Estate',
    slug: 'hidden-estate',
    genre: 'Classic Fiction',
    author: 'Ava Sinclair',
    palette: ['#0F172A', '#1E293B', '#F8E16C', '#E2E8F0'],
    titleLines: ['HIDDEN', 'ESTATE'],
    art: `
      <rect x="78" y="170" width="244" height="152" rx="18" fill="#E2E8F0" fill-opacity="0.16"/>
      <rect x="116" y="122" width="168" height="58" rx="10" fill="#F8E16C" fill-opacity="0.18"/>
      <path d="M64 340H336" stroke="#F8E16C" stroke-width="10" stroke-linecap="round"/>
      <path d="M90 340V456M140 340V456M200 340V456M260 340V456M310 340V456" stroke="#E2E8F0" stroke-width="12" stroke-linecap="round"/>
      <path d="M94 248H306" stroke="#E2E8F0" stroke-width="12" stroke-linecap="round"/>
      <path d="M118 214H282" stroke="#E2E8F0" stroke-width="10" stroke-linecap="round"/>
    `
  },
  {
    key: 'Golden Letters',
    slug: 'golden-letters',
    genre: 'Classic Fiction',
    author: 'Daniel Hart',
    palette: ['#311B13', '#6B3E26', '#F5C451', '#FFF4D6'],
    titleLines: ['GOLDEN', 'LETTERS'],
    art: `
      <rect x="92" y="170" width="216" height="156" rx="18" fill="#FFF4D6" fill-opacity="0.12" stroke="#F5C451" stroke-width="4"/>
      <path d="M92 196L200 274L308 196" stroke="#F5C451" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M92 196L92 326H308V196" stroke="#FFF4D6" stroke-width="8" stroke-linejoin="round"/>
      <path d="M134 382C158 356 182 348 200 348C218 348 242 356 266 382" stroke="#F5C451" stroke-width="10" stroke-linecap="round"/>
      <circle cx="200" cy="130" r="28" fill="#F5C451" fill-opacity="0.22"/>
    `
  },
  {
    key: 'Quiet Summer',
    slug: 'quiet-summer',
    genre: 'Classic Fiction',
    author: 'Mira Bennett',
    palette: ['#134E4A', '#0F766E', '#FDE68A', '#ECFDF5'],
    titleLines: ['QUIET', 'SUMMER'],
    art: `
      <circle cx="200" cy="174" r="68" fill="#FDE68A" fill-opacity="0.24"/>
      <path d="M70 366C124 326 168 308 200 308C232 308 276 326 330 366" stroke="#ECFDF5" stroke-width="10" stroke-linecap="round"/>
      <path d="M96 438C120 380 156 352 200 352C244 352 280 380 304 438" stroke="#FDE68A" stroke-width="12" stroke-linecap="round"/>
      <path d="M140 258C156 240 174 232 200 232C226 232 244 240 260 258" stroke="#ECFDF5" stroke-width="8" stroke-linecap="round"/>
    `
  },
  {
    key: 'Vanished Portrait',
    slug: 'vanished-portrait',
    genre: 'Classic Fiction',
    author: 'Noah Whitman',
    palette: ['#111827', '#4B5563', '#D4AF37', '#F9FAFB'],
    titleLines: ['VANISHED', 'PORTRAIT'],
    art: `
      <rect x="114" y="114" width="172" height="234" rx="14" fill="none" stroke="#D4AF37" stroke-width="10"/>
      <rect x="136" y="136" width="128" height="190" rx="10" fill="#F9FAFB" fill-opacity="0.12"/>
      <path d="M154 292C176 260 188 252 200 252C212 252 224 260 246 292" stroke="#F9FAFB" stroke-width="10" stroke-linecap="round"/>
      <circle cx="200" cy="222" r="24" fill="#F9FAFB"/>
      <path d="M120 110L282 350" stroke="#D4AF37" stroke-width="8" stroke-linecap="round" opacity="0.75"/>
    `
  },
  {
    key: 'Midnight Ballroom',
    slug: 'midnight-ballroom',
    genre: 'Classic Fiction',
    author: 'Clara Ellis',
    palette: ['#1E1B4B', '#312E81', '#F9A8D4', '#FDF2F8'],
    titleLines: ['MIDNIGHT', 'BALLROOM'],
    art: `
      <path d="M200 118V222" stroke="#FDF2F8" stroke-width="8" stroke-linecap="round"/>
      <path d="M150 158H250" stroke="#F9A8D4" stroke-width="8" stroke-linecap="round"/>
      <path d="M130 198C154 222 176 234 200 234C224 234 246 222 270 198" stroke="#FDF2F8" stroke-width="8" stroke-linecap="round"/>
      <circle cx="150" cy="210" r="12" fill="#F9A8D4"/>
      <circle cx="200" cy="222" r="12" fill="#F9A8D4"/>
      <circle cx="250" cy="210" r="12" fill="#F9A8D4"/>
      <path d="M98 430C128 372 162 340 200 340C238 340 272 372 302 430" stroke="#FDF2F8" stroke-width="12" stroke-linecap="round"/>
    `
  },
  {
    key: 'Silent Protocol',
    slug: 'silent-protocol',
    genre: 'Dystopian Fiction',
    author: 'Elena Cross',
    palette: ['#020617', '#0F172A', '#22D3EE', '#E2E8F0'],
    titleLines: ['SILENT', 'PROTOCOL'],
    art: `
      <rect x="104" y="132" width="192" height="128" rx="18" fill="#E2E8F0" fill-opacity="0.08" stroke="#22D3EE" stroke-width="4"/>
      <path d="M126 166H274M126 198H224M126 230H254" stroke="#E2E8F0" stroke-width="8" stroke-linecap="round"/>
      <path d="M104 332H296" stroke="#22D3EE" stroke-width="10" stroke-linecap="round"/>
      <path d="M128 332V432M200 332V392M272 332V452" stroke="#22D3EE" stroke-width="10" stroke-linecap="round"/>
    `
  },
  {
    key: 'Iron City',
    slug: 'iron-city',
    genre: 'Dystopian Fiction',
    author: 'Marcus Vale',
    palette: ['#111827', '#374151', '#F97316', '#F3F4F6'],
    titleLines: ['IRON', 'CITY'],
    art: `
      <path d="M82 444H318" stroke="#F97316" stroke-width="10" stroke-linecap="round"/>
      <rect x="100" y="254" width="44" height="190" fill="#F3F4F6" fill-opacity="0.16"/>
      <rect x="154" y="204" width="56" height="240" fill="#F3F4F6" fill-opacity="0.16"/>
      <rect x="220" y="166" width="72" height="278" fill="#F3F4F6" fill-opacity="0.16"/>
      <path d="M120 284H124M120 314H124M120 344H124M120 374H124M172 236H176M172 268H176M172 300H176M240 204H244M240 236H244M240 268H244M240 300H244" stroke="#F97316" stroke-width="8" stroke-linecap="round"/>
    `
  },
  {
    key: 'Broken Signal',
    slug: 'broken-signal',
    genre: 'Dystopian Fiction',
    author: 'Sera Quinn',
    palette: ['#0B1120', '#1E293B', '#FB7185', '#F8FAFC'],
    titleLines: ['BROKEN', 'SIGNAL'],
    art: `
      <path d="M88 398C122 350 158 326 200 326C242 326 278 350 312 398" stroke="#F8FAFC" stroke-width="10" stroke-linecap="round"/>
      <path d="M118 366C142 334 168 318 200 318C232 318 258 334 282 366" stroke="#FB7185" stroke-width="8" stroke-linecap="round"/>
      <path d="M148 334C164 316 182 306 200 306C218 306 236 316 252 334" stroke="#F8FAFC" stroke-width="8" stroke-linecap="round"/>
      <path d="M176 302C184 292 192 286 200 286C208 286 216 292 224 302" stroke="#FB7185" stroke-width="8" stroke-linecap="round"/>
      <path d="M122 166L170 214L222 150L280 208" stroke="#FB7185" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
    `
  },
  {
    key: 'Last Archive',
    slug: 'last-archive',
    genre: 'Dystopian Fiction',
    author: 'Jonah Pike',
    palette: ['#172554', '#1D4ED8', '#93C5FD', '#EFF6FF'],
    titleLines: ['LAST', 'ARCHIVE'],
    art: `
      <rect x="88" y="158" width="224" height="230" rx="18" fill="#EFF6FF" fill-opacity="0.08" stroke="#93C5FD" stroke-width="4"/>
      <path d="M122 198H278M122 244H278M122 290H278M122 336H278" stroke="#EFF6FF" stroke-width="8" stroke-linecap="round"/>
      <path d="M148 176V370M200 176V370M252 176V370" stroke="#93C5FD" stroke-width="6"/>
      <circle cx="200" cy="122" r="28" fill="#93C5FD" fill-opacity="0.24"/>
    `
  },
  {
    key: 'Shadow Machine',
    slug: 'shadow-machine',
    genre: 'Dystopian Fiction',
    author: 'Rhea Knox',
    palette: ['#09090B', '#27272A', '#A855F7', '#F4F4F5'],
    titleLines: ['SHADOW', 'MACHINE'],
    art: `
      <circle cx="200" cy="220" r="74" fill="none" stroke="#F4F4F5" stroke-width="12"/>
      <circle cx="200" cy="220" r="28" fill="#A855F7"/>
      <path d="M200 134V106M200 334V306M286 220H314M86 220H114M258 162L278 142M122 298L142 278M258 278L278 298M122 142L142 162" stroke="#A855F7" stroke-width="10" stroke-linecap="round"/>
      <path d="M200 220L246 186" stroke="#F4F4F5" stroke-width="10" stroke-linecap="round"/>
    `
  },
  {
    key: 'Autumn Promise',
    slug: 'autumn-promise',
    genre: 'Romance',
    author: 'Ivy Monroe',
    palette: ['#7C2D12', '#C2410C', '#FDBA74', '#FFF7ED'],
    titleLines: ['AUTUMN', 'PROMISE'],
    art: `
      <path d="M200 434C150 392 116 360 116 316C116 282 142 258 172 258C190 258 206 266 216 280C226 266 242 258 260 258C290 258 316 282 316 316C316 360 282 392 232 434L216 448L200 434Z" fill="#FDBA74"/>
      <path d="M118 190C142 162 162 150 184 150C174 176 152 198 118 190Z" fill="#FDBA74"/>
      <path d="M282 190C258 162 238 150 216 150C226 176 248 198 282 190Z" fill="#FDBA74"/>
    `
  },
  {
    key: 'Starlit Garden',
    slug: 'starlit-garden',
    genre: 'Romance',
    author: 'Lena Moore',
    palette: ['#14532D', '#166534', '#F9A8D4', '#FDF2F8'],
    titleLines: ['STARLIT', 'GARDEN'],
    art: `
      <circle cx="200" cy="154" r="18" fill="#FDF2F8"/>
      <path d="M200 118V190M164 154H236M174 128L226 180M226 128L174 180" stroke="#F9A8D4" stroke-width="6" stroke-linecap="round"/>
      <path d="M102 438C126 388 152 356 180 340M298 438C274 388 248 356 220 340" stroke="#FDF2F8" stroke-width="10" stroke-linecap="round"/>
      <path d="M180 340C156 292 146 264 146 228M220 340C244 292 254 264 254 228" stroke="#166534" stroke-width="8" stroke-linecap="round"/>
      <circle cx="146" cy="228" r="18" fill="#F9A8D4"/>
      <circle cx="254" cy="228" r="18" fill="#F9A8D4"/>
    `
  },
  {
    key: 'Secret Waltz',
    slug: 'secret-waltz',
    genre: 'Romance',
    author: 'Julian West',
    palette: ['#581C87', '#7E22CE', '#F0ABFC', '#FAF5FF'],
    titleLines: ['SECRET', 'WALTZ'],
    art: `
      <path d="M144 410C162 358 176 326 188 312C176 284 176 252 196 230C214 246 220 274 216 304C236 316 254 346 272 410" stroke="#FAF5FF" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M132 222C150 208 164 202 180 202C172 220 158 232 132 222Z" fill="#F0ABFC"/>
      <path d="M268 222C250 208 236 202 220 202C228 220 242 232 268 222Z" fill="#F0ABFC"/>
    `
  },
  {
    key: 'Tender Harbor',
    slug: 'tender-harbor',
    genre: 'Romance',
    author: 'Nora Hale',
    palette: ['#0F766E', '#0891B2', '#FDE68A', '#ECFEFF'],
    titleLines: ['TENDER', 'HARBOR'],
    art: `
      <path d="M84 402C118 392 148 388 174 388C214 388 256 396 316 414" stroke="#ECFEFF" stroke-width="10" stroke-linecap="round"/>
      <path d="M220 154V332" stroke="#FDE68A" stroke-width="10" stroke-linecap="round"/>
      <path d="M220 154L150 236H220" stroke="#ECFEFF" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M220 182L278 226H220" stroke="#ECFEFF" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M190 332H250" stroke="#FDE68A" stroke-width="10" stroke-linecap="round"/>
    `
  },
  {
    key: 'Rosy Letter',
    slug: 'rosy-letter',
    genre: 'Romance',
    author: 'Paige Rowan',
    palette: ['#881337', '#BE185D', '#FDA4AF', '#FFF1F2'],
    titleLines: ['ROSY', 'LETTER'],
    art: `
      <rect x="92" y="182" width="216" height="146" rx="18" fill="#FFF1F2" fill-opacity="0.1" stroke="#FDA4AF" stroke-width="4"/>
      <path d="M92 208L200 284L308 208" stroke="#FDA4AF" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M200 396C176 372 160 354 160 332C160 314 174 300 192 300C202 300 212 304 220 314C228 304 238 300 248 300C266 300 280 314 280 332C280 354 264 372 240 396L220 412L200 396Z" fill="#FDA4AF"/>
    `
  },
  {
    key: 'Crimson Manor',
    slug: 'crimson-manor',
    genre: 'Mystery',
    author: 'Harriet Doyle',
    palette: ['#1F0A0A', '#450A0A', '#EF4444', '#FDECEC'],
    titleLines: ['CRIMSON', 'MANOR'],
    art: `
      <path d="M88 438H312" stroke="#FDECEC" stroke-width="10" stroke-linecap="round"/>
      <path d="M120 438V286L200 226L280 286V438" stroke="#EF4444" stroke-width="10" stroke-linejoin="round"/>
      <path d="M154 316H176M224 316H246M154 356H176M224 356H246" stroke="#FDECEC" stroke-width="10" stroke-linecap="round"/>
      <rect x="188" y="356" width="24" height="82" fill="#FDECEC" fill-opacity="0.2"/>
    `
  },
  {
    key: 'Locked Clue',
    slug: 'locked-clue',
    genre: 'Mystery',
    author: 'Owen Blake',
    palette: ['#0F172A', '#1E293B', '#EAB308', '#FEFCE8'],
    titleLines: ['LOCKED', 'CLUE'],
    art: `
      <path d="M154 254V212C154 186 174 166 200 166C226 166 246 186 246 212V254" stroke="#FEFCE8" stroke-width="12" stroke-linecap="round"/>
      <rect x="132" y="254" width="136" height="166" rx="24" fill="#EAB308"/>
      <circle cx="200" cy="322" r="18" fill="#0F172A"/>
      <path d="M200 340V376" stroke="#0F172A" stroke-width="10" stroke-linecap="round"/>
    `
  },
  {
    key: 'Whispering Lantern',
    slug: 'whispering-lantern',
    genre: 'Mystery',
    author: 'Nina Frost',
    palette: ['#111827', '#1F2937', '#F59E0B', '#FFFBEB'],
    titleLines: ['WHISPERING', 'LANTERN'],
    art: `
      <path d="M200 124V168" stroke="#FFFBEB" stroke-width="8" stroke-linecap="round"/>
      <rect x="154" y="168" width="92" height="144" rx="22" fill="#F59E0B" fill-opacity="0.18" stroke="#FFFBEB" stroke-width="8"/>
      <path d="M170 204H230M170 238H230M170 272H230" stroke="#FFFBEB" stroke-width="8" stroke-linecap="round"/>
      <path d="M148 332C166 304 182 292 200 292C218 292 234 304 252 332" stroke="#F59E0B" stroke-width="10" stroke-linecap="round"/>
      <circle cx="200" cy="240" r="24" fill="#FDE68A" fill-opacity="0.42"/>
    `
  },
  {
    key: 'Shattered Corridor',
    slug: 'shattered-corridor',
    genre: 'Mystery',
    author: 'Caleb Reed',
    palette: ['#111827', '#374151', '#60A5FA', '#E5E7EB'],
    titleLines: ['SHATTERED', 'CORRIDOR'],
    art: `
      <path d="M120 158L160 442M280 158L240 442M120 158H280M160 442H240" stroke="#E5E7EB" stroke-width="10" stroke-linejoin="round"/>
      <path d="M160 158L132 442M240 158L268 442" stroke="#60A5FA" stroke-width="6"/>
      <path d="M184 276L210 242L194 308L222 284" stroke="#60A5FA" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
    `
  },
  {
    key: 'Hollow Case',
    slug: 'hollow-case',
    genre: 'Mystery',
    author: 'Mason Ward',
    palette: ['#172033', '#1E293B', '#14B8A6', '#ECFEFF'],
    titleLines: ['HOLLOW', 'CASE'],
    art: `
      <rect x="112" y="164" width="176" height="228" rx="18" fill="#ECFEFF" fill-opacity="0.08" stroke="#14B8A6" stroke-width="6"/>
      <path d="M112 220H288" stroke="#14B8A6" stroke-width="8" stroke-linecap="round"/>
      <path d="M156 164V134H244V164" stroke="#ECFEFF" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M158 284C174 264 188 256 200 256C212 256 226 264 242 284" stroke="#ECFEFF" stroke-width="10" stroke-linecap="round"/>
      <circle cx="200" cy="232" r="20" fill="#14B8A6"/>
    `
  }
];

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildTitle(lines, color) {
  const baseY = 438;
  const lineGap = 48;
  return lines.map((line, index) => (
    `<text x="200" y="${baseY + (index * lineGap)}" fill="${color}" font-family="Georgia, serif" font-size="${line.length > 10 ? 40 : 46}" font-weight="700" text-anchor="middle" letter-spacing="2">${escapeXml(line)}</text>`
  )).join('\n');
}

function createSvg(config) {
  const [bgOuter, bgInner, accent, text] = config.palette;
  const titleMarkup = buildTitle(config.titleLines, text);
  return `<svg width="400" height="600" viewBox="0 0 400 600" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="600" rx="28" fill="${bgOuter}"/>
  <rect x="24" y="24" width="352" height="552" rx="22" fill="url(#bg)"/>
  <circle cx="200" cy="156" r="96" fill="${accent}" fill-opacity="0.12"/>
  ${config.art}
  <text x="200" y="90" fill="${text}" font-family="Arial, sans-serif" font-size="18" text-anchor="middle" letter-spacing="4">${escapeXml(config.genre.toUpperCase())}</text>
  ${titleMarkup}
  <text x="200" y="540" fill="${text}" font-family="Arial, sans-serif" font-size="20" text-anchor="middle" letter-spacing="3">${escapeXml(config.author.toUpperCase())}</text>
  <defs>
    <linearGradient id="bg" x1="36" y1="40" x2="352" y2="568" gradientUnits="userSpaceOnUse">
      <stop stop-color="${bgInner}"/>
      <stop offset="1" stop-color="${bgOuter}"/>
    </linearGradient>
  </defs>
</svg>
`;
}

function writeCovers() {
  fs.mkdirSync(imagesDir, { recursive: true });
  for (const config of coverConfigs) {
    const svg = createSvg(config);
    fs.writeFileSync(path.join(imagesDir, `${config.slug}.svg`), svg, 'utf8');
  }
}

function updateBookData() {
  const coverByTitle = new Map(coverConfigs.map((config) => [config.key, `/images/${config.slug}.svg`]));
  const raw = fs.readFileSync(dataPath, 'utf8');
  const data = JSON.parse(raw);

  for (const book of data.books) {
    const baseTitle = book.title.replace(/\s+\d+$/, '');
    if (coverByTitle.has(baseTitle)) {
      book.coverImage = coverByTitle.get(baseTitle);
    }
  }

  fs.writeFileSync(dataPath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

writeCovers();
updateBookData();
console.log(`Generated ${coverConfigs.length} title-specific covers and updated book data.`);
