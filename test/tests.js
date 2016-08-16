'use strict';

var photoURL;
var qUnitFixture = document.getElementById('qunit-fixture');

// Create an image tag for the first photo
var cb = function(data) {
    photoURL = data.items[0].media.m; // Save the photo URL
    var imgTag = document.createElement('img');
    imgTag.setAttribute('src', photoURL);

    // Add a click listener
    imgTag.addEventListener('click', function () {
        // If the image isn't selected, then select it
        // Otherwise, deselect it
        if (!!imgTag.classList.contains('selected')) {
            deselectImage(imgTag, data.items[0]);
        }
        else {
            selectImage(imgTag, data.items[0]);
        }
    });

    // Append the image tag to the qunit-fixture tag
    qUnitFixture.appendChild(imgTag);

    QUnit.test('At least one photo must be returned from the Flickr API', function(assert) {
        assert.ok(data.items.length >= 1);
    });

    QUnit.test('When a photo is clicked, it must be selected', function(assert) {

        // Simulate a click on the image
        imgTag.click();

        // Check that the image tag contains the 'selected' class
        assert.ok(imgTag.classList.contains('selected'));

    });

    QUnit.test('The URL of the selected photo must be saved in local storage', function(assert) {

        // Get the contents of the selectedImages item in local storage
        var selectedImages = JSON.parse(window.localStorage.getItem('selectedImages'));

        // Wait for the URL to be saved
        var done = assert.async();
        setTimeout(function() {
            // Now check that our photo URL exists in there
            assert.ok(selectedImages.images.indexOf(photoURL) > -1);
            done();
        }, 1000);

    });

    QUnit.test('When the same photo is clicked again, it must be deselected', function(assert) {

        // Click the image again
        imgTag.click();

        // Now check that the 'selected' class is no longer there
        assert.notOk(imgTag.classList.contains('selected'));

    });

    QUnit.test('The URL of the selected photo must be removed from local storage', function(assert) {

        // Get the contents of the selectedImages item in local storage
        var selectedImages = JSON.parse(window.localStorage.getItem('selectedImages'));

        // Wait for the URL to be removed
        var done = assert.async();
        setTimeout(function() {
            // Now check that our photo URL no longer exists in there
            assert.ok(selectedImages.images.indexOf(photoURL) === -1);
            done();
        }, 1000);

    });

};
