import 'bootstrap';
import { createIcons, icons } from 'lucide';

import collapse from "./scripts/collapse";

document.addEventListener('DOMContentLoaded', () => {
    console.log('COMMON READY');

    createIcons({ icons });
    collapse({ toggle: false });
});
