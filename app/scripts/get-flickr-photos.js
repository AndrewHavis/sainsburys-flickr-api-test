'use strict';

var cb = function (data) {
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
            var imgTag = createFlickrImgTag(data.items[imgNum], imgNum);

            // Add our image tag as a child of the divCol element
            divCol.appendChild(imgTag);

            // Add the divCol element as a child of divRow
            divRow.appendChild(divCol);

            imgNum++; // Increment our image number
        }

        // Append our row as a child of the photos element
        photos.appendChild(divRow);

    }

};

var createFlickrImgTag = function (item, imgId) {

    // Create an img tag for the given Flickr photo item
    var imgTag = document.createElement('img');

    // Get the URL of our image and assign it to our image tag
    var imgURL = item.media.m;
    if (!!imgURL) {
        imgTag.setAttribute('src', imgURL);
    }
    else {
        console.error('Cannot find URL for image ' + imgId);
    }

    // Add the title of the image as the alt and title attributes (if they are available)
    var imgTitle = item.title;
    if (!!imgTitle) {
        imgTag.setAttribute('alt', imgTitle);
        imgTag.setAttribute('title', imgTitle);
    }

    // Set the image ID attribute if we have an ID given to us
    if (!!imgId) {
        imgTag.setAttribute('id', 'photo-' + imgId);
    }

    // Now set a click listener for the image, so that we can select it
    // Note that we use the URL as a unique identifier for the image, rather than the ID attribute
    imgTag.addEventListener('click', function () {
        // If the image isn't selected, then select it
        // Otherwise, deselect it
        if (!!imgTag.classList.contains('selected')) {
            deselectImage(imgTag, item);
        }
        else {
            selectImage(imgTag, item);
        }
    });

    // Now get the list of selected images from local storage
    // If our image URL matches one in the list, add the 'selected' class
    var selectedImages = JSON.parse(window.localStorage.getItem('selectedImages'));
    if (selectedImages !== null) {
        var imageSelectedIndex = selectedImages.images.indexOf(imgURL);
        if (imageSelectedIndex > -1) {
            imgTag.classList.add('selected');
        }
    }

    // Return our image tag
    return imgTag;

};

// Assign a select image function for our click handler
var selectImage = function(tag, item) {

    // Assign the 'selected' class to our image
    tag.classList.add('selected');

    // Now set up an array of selected images in local storage
    // If one already exists, append to it
    // Note that we use the image URLs as unique identifiers for the images
    var selectedImages = JSON.parse(window.localStorage.getItem('selectedImages'));
    if (selectedImages === null) {
        selectedImages = {}; // Initiate selectedImages as a JSON object if it doesn't already exist
        selectedImages.images = [];
    }
    selectedImages.images.push(item.media.m);
    window.localStorage.setItem('selectedImages', JSON.stringify(selectedImages));

};

// Assign a deselect image function for our click handler too
var deselectImage = function(tag, item) {

    // Remove the 'selected' class from our image
    tag.classList.remove('selected');

    // Remove the image from our array of selected images in local storage too
    var selectedImages = JSON.parse(window.localStorage.getItem('selectedImages'));
    selectedImages.images.splice(selectedImages.images.indexOf(item.media.m));
    window.localStorage.setItem('selectedImages', JSON.stringify(selectedImages));

};


( function () {
    // Get some recent public photos from Flickr with the tag 'london'
    var tags = 'london';
    var script = document.createElement('script');
    script.src = 'http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=cb&tags=' + tags;
    document.head.appendChild(script);
})();
