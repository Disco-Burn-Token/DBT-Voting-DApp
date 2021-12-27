var animateButton = function(e) {

    e.preventDefault;
    //reset animation
    e.target.classList.remove('animate');

    e.target.classList.add('animate');
    setTimeout(function() {
        e.target.classList.remove('animate');
    }, 700);
};

var bubblyButtons = document.getElementsByClassName("bubbly-button1");

for (var i = 0; i < bubblyButtons.length; i++) {
    bubblyButtons[i].addEventListener('click', animateButton, false);
}

var animateButton = function(e) {

    e.preventDefault;
    //reset animation
    e.target.classList.remove('animate');

    e.target.classList.add('animate');
    setTimeout(function() {
        e.target.classList.remove('animate');
    }, 700);
};

var bubblyButtons = document.getElementsByClassName("bubbly-button2");

for (var i = 0; i < bubblyButtons.length; i++) {
    bubblyButtons[i].addEventListener('click', animateButton, false);
}


//JS for VOTE button ONE functionality
$(function() {
    $("#vote_token_1_button").click(function() {
        $("#vote_token_1_button").addClass("onclic", 250, validate);
    });

    function validate() {
        setTimeout(function() {
            $("#vote_token_1_button").removeClass("onclic");
            $("#vote_token_1_button").addClass("validate", 450, callback);
        }, 2250);
    }

    function callback() {
        setTimeout(function() {
            $("#vote_token_1_button").removeClass("validate");
        }, 1250);
    }
});

//JS for VOTE button TWO functionality
$(function() {
    $("#vote_token_2_button").click(function() {
        $("#vote_token_2_button").addClass("onclic", 250, validate);
    });

    function validate() {
        setTimeout(function() {
            $("#vote_token_2_button").removeClass("onclic");
            $("#vote_token_2_button").addClass("validate", 450, callback);
        }, 2250);
    }

    function callback() {
        setTimeout(function() {
            $("#vote_token_2_button").removeClass("validate");
        }, 1250);
    }
});

//JS for VOTE button THREE functionality
$(function() {
    $("#vote_token_3_button").click(function() {
        $("#vote_token_3_button").addClass("onclic", 250, validate);
    });

    function validate() {
        setTimeout(function() {
            $("#vote_token_3_button").removeClass("onclic");
            $("#vote_token_3_button").addClass("validate", 450, callback);
        }, 2250);
    }

    function callback() {
        setTimeout(function() {
            $("#vote_token_3_button").removeClass("validate");
        }, 1250);
    }
});

//JS for VOTE button FOUR functionality
$(function() {
    $("#vote_token_4_button").click(function() {
        $("#vote_token_4_button").addClass("onclic", 250, validate);
    });

    function validate() {
        setTimeout(function() {
            $("#vote_token_4_button").removeClass("onclic");
            $("#vote_token_4_button").addClass("validate", 450, callback);
        }, 2250);
    }

    function callback() {
        setTimeout(function() {
            $("#vote_token_4_button").removeClass("validate");
        }, 1250);
    }
});

//JS for VOTE button FIVE functionality
$(function() {
    $("#vote_token_5_button").click(function() {
        $("#vote_token_5_button").addClass("onclic", 250, validate);
    });

    function validate() {
        setTimeout(function() {
            $("#vote_token_5_button").removeClass("onclic");
            $("#vote_token_5_button").addClass("validate", 450, callback);
        }, 2250);
    }

    function callback() {
        setTimeout(function() {
            $("#vote_token_5_button").removeClass("validate");
        }, 1250);
    }
});