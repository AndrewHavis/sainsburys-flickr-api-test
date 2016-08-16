'use strict';

function cb (data) {
    console.log(data);
    // Add our photos to the page
    // I have transferred this function outside of the function below to avoid errors about the callback variable being undefined
    var photos = document.getElementById('photos');

    // We will create a grid with four photos per row, as there should be 20 photos returned
    // However, we won't make a hard assumption that there are 20 photos - more or less than 20 should be allowed
    var photosPerRow = 4;
    var numberOfRows = Math.ceil(data.items.length / photosPerRow);
    var imgNum = 0; // Used to assign our image numbers

    // Now loop through the photos and create the grid
    for (var i = 0; i < numberOfRows; i++) {
        // Create our row section
        var divRow = document.createElement('div');
        divRow.className = 'row photoRow';
        for (var j = 0; j < photosPerRow; j++) {
            // Create our image section
            var divCol = document.createElement('div');
            divCol.className = 'col-md-' + (12 / photosPerRow);

            // Create our image tag
            var imgTag = document.createElement('img');

            // Get the URL of our image and assign it to our image tag
            var imgURL = data.items[imgNum].media.m;
            imgTag.setAttribute('src', imgURL);

            // Add the title of the image as the alt and title attributes
            var imgTitle = data.items[imgNum].title;
            imgTag.setAttribute('alt', imgTitle);
            imgTag.setAttribute('title', imgTitle);

            // Use our image number as the image ID attribute
            imgTag.setAttribute('id', 'photo-' + imgNum);

            // Add our image tag as a child of the divCol element
            divCol.appendChild(imgTag);

            // Add the divCol element as a child of divRow
            divRow.appendChild(divCol);

            imgNum++; // Increment our image number
        }

        // Append our row as a child of the photos element
        photos.appendChild(divRow);

    }

}
( function () {
    var tags = 'london';
    var script = document.createElement('script');
    script.src = 'http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=cb&tags=' + tags;
    document.head.appendChild(script);
})();
