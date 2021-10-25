/* Contact Form JavaScript
*/


(function($) {
    "use strict"; 
	
    /* Contact Form */
    $("#submit").click(function(event) {
   /* $("#contact-form").validator().on("submit", function(event) {*/
    if (!formValid()) {
            // handle the invalid form...
            formError();
            submitMSG(false, "Please fill all fields!");
        } else {
            // everything looks good!
            event.preventDefault();
            submitForm();
        }
    });

    //validator

    function formValid() {
        var name = $("#name").val();
        var email = $("#email").val();
        var phone = $("#phone").val();
        var message = $("#message").val();

        var result = true;

        if (name == "" || email == "" || phone == "" || message == "") {
            result = false;
        }

        return result;
    }

    function submitForm() {
        // initiate variables with form content
		var name = $("#name").val();
        var email = $("#email").val();
        var phone = $("#phone").val();
        var message = $("#message").val();
    
        $.ajax({
            type: "POST",
            url: "homecontactform-process.php",
            data: "name=" + name + "&email=" + email + "&phone=" + phone + "&message=" + message, 
            success: function(text) {
                if (text == "success") {
                    formSuccess();
                } else {
                    formError();
                    submitMSG(false, text);
                }
            }
        });
	}

    function formSuccess() {
        $("#contact-form")[0].reset();
        submitMSG(true, "Message Submitted!");
        $("input").removeClass('notEmpty'); // resets the field label after submission
        $("textarea").removeClass('notEmpty'); // resets the field label after submission
    }

    function formError() {
        $("#contact-form").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
	}

    function submitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
    }


    

})(jQuery);