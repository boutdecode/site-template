export default (tag, apiKey) => {
    fetch(`//api.pexels.com/v1/search?query=${tag}&per_page=1&page=1&w=1680&h=940&fit=max&auto=compress`, {
        headers: {
            Authorization: `Bearer ${apiKey}`
        }
    })
        .then(response => response.json())
        .then(data => {
            const imageUrl = data.photos[0].src.landscape;

            document.body.style.transition = 'background-image 1s ease-in';
            document.body.style.backgroundImage = `url(${imageUrl})`;
            document.body.style.backgroundSize = 'cover';
        });
};
