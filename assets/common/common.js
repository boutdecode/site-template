import 'vite/modulepreload-polyfill';

import 'bootstrap';
import { createIcons, icons } from 'lucide';

document.addEventListener('DOMContentLoaded', () => {
    console.log('READY');
    createIcons({ icons });
});
