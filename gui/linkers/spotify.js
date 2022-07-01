window.onSpotifyIframeApiReady = (IFrameAPI) => {
    let element = document.getElementById('embed-iframe');
    let options = {
        uri: 'spotify:track:6iq7kLF6m5uhr5vE0ow0hC?si=5c0b15c9e8b047a9'
    };
    let callback = (EmbedController) => {
        document.querySelectorAll('ul#episodes > li > button').forEach(
            episode => {
                episode.addEventListener('click', () => {
                    EmbedController.loadUri(episode.dataset.spotifyId)
                });
            })
    };
    IFrameAPI.createController(element, options, callback);
};