import { Collapse } from 'bootstrap';

export default (options) => {
    const collapseElementList = document.querySelectorAll('.collapse');
    [...collapseElementList].map(collapseEl => new Collapse(collapseEl, options));
}
