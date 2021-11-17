/* Contact Form JavaScript
*/


(function($) {
    "use strict"; 
	
    /* Contact Form */
    $("#submit").click(function(event) {
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
      /*  var multiPage = $("#multiple-pages").checked;
        var smartStarter = $("#smart-starter").checked;
        var smartProfessional = $("#smart-professional").checked;
        var smartBusiness = $("#smart-business").checked;
        var singlePager = $("#single-pager").checked; */
        

        var result = true;

        if (name == "" || email == "" || phone == "" || /* smartBusiness == ""|| smartProfessional == "" || singlePager == "" || multiPage == "" || smartStarter == "" || */ message == "") {
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


        /* var singlePager = $('input[type="checkbox"]:checked');
        var multiPage = $('input[type="checkbox"]:checked');
        var smartStarter = $('input[type="checkbox"]:checked');
        var smartProfessional = $('input[type="checkbox"]:checked');
        var smartBusiness = $('input[type="checkbox"]:checked');
        var checkbox = $('input[type="checkbox"]:checked'); */

        var selectedServices = $('.service:checked');

        var servicesList = [];
        selectedServices.each(function(index,service) {
        servicesList.push($(service).attr('aria-name'));
});
 
    
        $.ajax({
            type: "POST",
            url: "salescontactform-process.php",
            data: {
                name: name,
                email: email,
                phone: phone,
                services: servicesList,
                message: message
            }, 
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
        $("#sales-form")[0].reset();
        submitMSG(true, "Message Submitted!");
        $("input").removeClass('notEmpty'); // resets the field label after submission
        $("textarea").removeClass('notEmpty'); // resets the field label after submission
    }

    function formError() {
        $("#sales-form").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
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