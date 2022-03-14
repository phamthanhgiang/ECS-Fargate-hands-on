//Add error message
function addError(el, message) {
    el.parent().addClass('error');
    if (el.closest('div').find('.error').first().length === 0) {
        el.closest('div').append('<span class="error"><i class="fas fa-exclamation-triangle"></i>' + message + '</span>');
    }
}

//Remove error message
function removeError(el) {
    el.parent().removeClass('error');
    if (el.closest('div').find('.error').first().length > 0) {
        el.closest('div').find('.error').first().remove();
    }
}

//Check error for form
function checkError(el) {
    var fieldName = el.attr('data-title'),
        messageRequired = 'Vui lòng nhập ' + fieldName,
        messageEmail = 'Địa chỉ email bạn đã nhập không hợp lệ.',
        messageAcceptation = 'Vui lòng chọn đồng ý';
    var lang = document.getElementsByTagName("html")[0].getAttribute("lang");
    if (lang === 'ja') {
        messageRequired = fieldName + 'を入力してください';
        messageEmail = '入力されたメールアドレスは有効ではありません。';
        messageAcceptation = '選択してください';
    }

    if (lang === 'en') {
        messageRequired = 'Please enter ' + fieldName;
        messageEmail = 'The email address you entered is not valid.';
        messageAcceptation = 'Please select agree.';
    }
    var valEl = el.val();

    removeError(el);
    if (valEl.length <= 0) {
        addError(el, messageRequired);
    } else {
        if (el.attr('name') === 'email' && !emailIsValid(valEl)) {
            addError(el, messageEmail);
        }
    }

    if (el.is(':checkbox') && !el.prop('checked')) {
        addError(el, messageAcceptation);
    }
}

function validateForm(form, requiredFields) {
    var flag;

    $.each(requiredFields, function (i, el) {
        checkError($('[name=' + el + ']'));
    });

    flag = form.find('div.error').length === 0;

    return flag;
}

function emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
        textbox.addEventListener(event, function() {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                this.value = "";
            }
        });
    });
}

function resetForm(form) {
    form.find('input, textarea').val('');
    form.find('input[checkbox]').prop('checked', false);
}

//scroll to top form
function scrollTopElement ($ele) {
    $('html, body').animate({
        scrollTop: $ele.offset().top - 80
    }, 500);
}