import 'vite/modulepreload-polyfill'

import './styles/main.scss';
import 'bootstrap';
import { createIcons, icons } from 'lucide';

document.addEventListener('DOMContentLoaded', () => {
    console.log('READY');
    createIcons({ icons });
});
