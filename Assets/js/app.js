//Initial array of animals	
$(document).ready(function () {
    var animal = ["fox", "cat", "pig", "tiger", "giraffe", "lizard", "panda", "deer", "elephant", "goat", "horse", "cow", "kangaroo",];

    //set up click event 
    $(document).on('click', '.animal', function () {
        var animalGify = $(this).html();
    // set up API for generating animal gify
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalGify + "&rating=pg-13&limit=20&api_key=dc6zaTOxFJmzC";
    //an AJAX call for each animal button clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            var results = response.data;
    // image shows
            $('#animals-view').empty();
            for (var j = 0; j < results.length; j++) {
                var imageView = results[j].images.fixed_height.url;
                var still = results[j].images.fixed_height_still.url;
                // display  images with attributes
                var gifImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                gifImage.attr('data-state', 'still');
                $('#animals-view').prepend(gifImage);
                gifImage.on('click', playGif);

                // Pulling ratings for each animal
                var rating = results[j].rating;
                var displayRated = $('<p>').text("Rating: " + rating);
                $('#animals-view').prepend(displayRated);
            }
        })

    //function to stop and animate gifs
     function playGif() {
         var state = $(this).attr('data-state');
            if (state === 'still') {
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            } else {
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
        }
    });

    //  create animal array buttons
    function renderButtons() {
        $('#buttons-view').empty();
        // loops to animals array
        for (var i = 0; i < animal.length; i++) {
            //create all animal buttons
            var a = $('<button>');
            a.addClass('animal');
            a.attr('data-name', animal[i]);
            a.text(animal[i]);
            $('#buttons-view').append(a);
        }
    }
    renderButtons();


    //adding new button to add more
    $(document).on('click', '#add-animal', function () {
        if ($('#animal-input').val().trim() == '') {
        }
        else {
            var animals = $('#animal-input').val().trim();
            animal.push(animals);
            $('#animal-input').val('');
            renderButtons();
            return false;

        }
    });
});
