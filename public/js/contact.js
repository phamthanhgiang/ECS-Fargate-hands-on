;(function ($, win) {
    var index = $.Index = (function () {

        function init() {

            var $processBar = $('#processBar'),
                $step1 = $('#step1'),
                $step2 = $('#step2'),
                $step3 = $('#step3'),
                $loading = $('#loading');
            var $form = $('#formContact'),
                $companyName = $('input[name=company_name]'),
                $canName = $('input[name=name]'),
                $canPhone = $('input[name=phone]'),
                $canEmail = $('input[name=email]'),
                $inquiry = $('textarea[name=inquiry]'),
                $acceptation = $('input[name=acceptation]');

            var requiredFields = ['company_name', 'name', 'email', 'inquiry', 'acceptation'];
            var contactData = new FormData();

            $('#confirmBtn').on({
                'click': function (e) {
                    e.preventDefault();

                    contactData.append('company_name', $companyName.val());
                    contactData.append('name', $canName.val());
                    contactData.append('phone', $canPhone.val());
                    contactData.append('email', $canEmail.val());
                    contactData.append('inquiry', $inquiry.val());
                    contactData.append('acceptation', $acceptation.val());

                    if (validateForm($form, requiredFields)) {
                        //set process active
                        $processBar.find('li').removeClass('active');
                        $processBar.find('[data-target=step2]').addClass('active');
                        $step1.removeClass('active');
                        $step2.addClass('active');

                        //fill field at step 2
                        $('#companyNameTarget').text($companyName.val());
                        $('#nameTarget').text($canName.val());
                        $('#phoneTarget').text($canPhone.val());
                        $('#emailTarget').text($canEmail.val());
                        $('#inquiryTarget').text($inquiry.val());
                    }
                }
            });

            $('#submitBtn').on({
                'click': function (e) {
                    var url = $form.attr('action');
                    $.ajax({
                        url: url,
                        type: 'POST',
                        data: contactData,
                        dataType: 'json',
                        processData: false,
                        contentType: false,
                        beforeSend: function () {
                            $loading.removeClass('hide');
                        },
                        success: function (response) {
                            var data = JSON.stringify(response),
                                obj = JSON.parse(data);

                            if (obj.success) {
                                resetForm($form);
                                //set process active
                                $processBar.find('li').removeClass('active');
                                $processBar.find('[data-target=step3]').addClass('active');

                                $step2.removeClass('active');
                                $step3.addClass('active');
                            } else {
                                $('#alert').append(obj.message);
                            }
                            $loading.addClass('hide');
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.warn(jqXHR.responseText);
                        },
                        complete: function () {
                            $loading.addClass('hide');
                        }
                    });
                }
            })

            $('#backBtn').on({
                'click': function (e) {
                    //set process active
                    $processBar.find('li').removeClass('active');
                    $processBar.find('[data-target=step1]').addClass('active');

                    $step2.removeClass('active');
                    $step1.addClass('active');
                }
            });

            setInputFilter(document.getElementById('phoneNumber'), function(value) {
                return /^-?\d*$/.test(value); // Allow digits and '-' only, using a RegExp
            });
        }

        return {
            init: init
        };

    })();

    /*----------------------------------------*/
    $(index.init);
})(jQuery, window);