

var DUGGAS;

(function(DUGGAS){

    DUGGAS = {

        trim: function(str) {
            return $.trim(str);
        },

        Placeholder: function(elem, placeholderText, stopPropagation){
            (function(elem, placeholderText){
                $(elem).blur(function(event){
                    var trimmedText = DUGGAS.trim($(this).attr("value"));
                    if(trimmedText === '' || trimmedText ===  placeholderText){
                        $(this).css('color', 'grey');
                        $(this).css('font-style', 'italic');
                        $(this).attr("value", placeholderText);
                    }
                    else {
                        $(this).css('color', '#000000');
                        $(this).css('font-style', 'normal');
                    }

                    if(stopPropagation){
                        event.stopPropagation();
                    }
                });
            })(elem, placeholderText);

            (function(elem, placeholderText){
                $(elem).click(function(event){
                    var trimmedText = EM.trim($(this).attr("value"));
                    if(trimmedText ===  placeholderText){
                        //Clear it
                        $(this).attr("value", "");
                    }

                    $(this).css('color', '#000000');
                    $(this).css('font-style', 'normal');

                    if(stopPropagation){
                        event.stopPropagation();
                    }

                });
            })(elem, placeholderText);

            //Triggers the inital setting of the placeholder text, if needed
            $(elem).trigger('blur');
        }
    }

})(DUGGAS);