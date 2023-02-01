function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
jQuery(document).ready(function($){
    let errType = false;
    var count_files = 0;
    var max_files = 10;
    var limit = false;
    var sizes = 0;
    var caption = $('#file-2').parent().find('.upload__box').find('.upload__caption').html();
    $('#file-2').fileupload({
        url: 'load.php',
        sequentialUploads: true,
        change: function (e, data) {
            $('#file-2').parent().find('.upload__box').find('.upload__caption').html(caption);
            $('#file-2').parent().find('.upload__file').removeClass('error');
            if(data.files.length + count_files > max_files){
                $('.notice').text('Можно загрузить не более '+max_files+' файлов').addClass('active notice_warning').removeClass('notice_success');
                setTimeout(function(){
                    $('.notice').text('').removeClass('active');
                }, 2000);
                limit = true;
                $('#file-2').parent().find('.upload__info').addClass('error');
            } else {
                limit = false;
                count_files = count_files + data.files.length;
                $('#file-2').parent().find('.upload__info').removeClass('error');

                data.files.forEach(function(item, i, arr) {
                     sizes = sizes + item.size;
                });
            }
        },
        add: function (e, data) {

            var jqXHR = data.submit().success(function (result, textStatus, jqXHR) {
                $('#file-2').parent().find('.upload__info').text('Загружаем файлы');
            }).error(function (jqXHR, textStatus, errorThrown) {
                //console.log('Ошибка');
            }).complete(function (result, textStatus, jqXHR) {
                if(isJsonString(result)){
                    // console.log(errType)
                    // if (errType) {
                    //     $("#file-2").parent().find(".upload__info").addClass("error")
                    //     $("#file-2").parent().find(".upload__info").html("Недопустимый тип файла")
                    //     $("#file-2").parent().find(".upload__file").addClass("error")
                    //     $('#file-2').parent().find('.upload__box').find('.upload__caption').html('Выбрать <br>заново');
                    // } else {
                        result = JSON.parse(result);
                        var overallProgress = $('#file-2').fileupload('progress');
                        var activeUploads = $('#file-2').fileupload('active');
                        var files_text = $('#files-2-text').val();
                        $('#files-2-text').val(files_text + '[|]' + result.file);
                        //console.log(files_text);
                        $('#file-2').parent().find('.upload__info').text('Выбрано ' + count_files + ' файла(ов)');
                    // }
                }
            });
        },
        send: function (e, data) {
            let err = false
            for (let file in data.files) {
                const nameArr = data.files[file].name.split('.')
                if (nameArr[nameArr.length - 1] === 'php' || nameArr[nameArr.length - 1] === 'js' || nameArr[nameArr.length - 1] === 'ts') {
                    count_files--
                    err = true
                    errType = true
                }
            }
            if (errType) {
                $("#file-2").parent().find(".upload__info").addClass("error")
                $("#file-2").parent().find(".upload__info").html("Недопустимый тип файла")
                $("#file-2").parent().find(".upload__file").addClass("error")
                $('#file-2').parent().find('.upload__box').find('.upload__caption').html('Выбрать <br>заново');
                errType = false
                jqXHR.abort();
            }
            if(limit){
                jqXHR.abort();
            }
            if(sizes>25000000){
                $('#file-2').parent().find('.upload__info').addClass('error');
                $('#file-2').parent().find('.upload__info').html('Вес файлов<br> превышает 25 МБ');
                $('#file-2').parent().find('.upload__box').find('.upload__caption').html('Выбрать <br>заново');
                $('#file-2').parent().find('.upload__file').addClass('error');
                sizes = 0;
                count_files = 0;
                $('#files-2-text').val('');
                jqXHR.abort();
            }
        }
    });
    $('#file-2-2').fileupload({
        url: 'load.php',
        sequentialUploads: true,
        change: function (e, data) {
            $('#file-2-2').parent().find('.upload__box').find('.upload__caption').html(caption);
            $('#file-2-2').parent().find('.upload__file').removeClass('error');
            if(data.files.length + count_files > max_files){
                $('.notice').text('Можно загрузить не более '+max_files+' файлов').addClass('active notice_warning').removeClass('notice_success');
                setTimeout(function(){
                    $('.notice').text('').removeClass('active');
                }, 2000);
                limit = true;
                $('#file-2-2').parent().find('.upload__info').addClass('error');
            } else {
                limit = false;
                count_files = count_files + data.files.length;
                $('#file-2-2').parent().find('.upload__info').removeClass('error');

                data.files.forEach(function(item, i, arr) {
                     sizes = sizes + item.size;
                });
            }
        },
        add: function (e, data) {

            var jqXHR = data.submit().success(function (result, textStatus, jqXHR) {
                let err = false
                for (let file of data.files) {
                    const nameArr = file.name.split('.')
                    if (nameArr[nameArr.length - 1] === 'php' || nameArr[nameArr.length - 1] === 'js' || nameArr[nameArr.length - 1] === 'ts') {
                        err = true
                        errType = true
                    }
                }
                if (err) {
                    jqXHR.abort()
                }
                $('#file-2-2').parent().find('.upload__info').text('Загружаем файлы');
            }).error(function (jqXHR, textStatus, errorThrown) {
                //console.log('Ошибка');
            }).complete(function (result, textStatus, jqXHR) {
                if(isJsonString(result)){
                    if (errType) {
                        $("#file-2-2").parent().find(".upload__info").addClass("error")
                        $("#file-2-2").parent().find(".upload__info").html("Недопустимый тип файла")
                        $("#file-2-2").parent().find(".upload__file").addClass("error")
                        $('#file-2-2').parent().find('.upload__box').find('.upload__caption').html('Выбрать <br>заново');
                    } else {
                        result = JSON.parse(result);
                        var overallProgress = $('#file-2-2').fileupload('progress');
                        var activeUploads = $('#file-2-2').fileupload('active');
                        var files_text = $('#files-2-2-text').val();
                        $('#files-2-2-text').val(files_text + '[|]' + result.file);
                        console.log(files_text, '2-2');
                        $('#file-2-2').parent().find('.upload__info').text('Выбрано ' + count_files + ' файла(ов)');
                    }
                }
            });
        },
        send: function (e, data) {
            if(limit){
                jqXHR.abort();
            }

            if(sizes>25000000){
                $('#file-2-2').parent().find('.upload__info').addClass('error');
                $('#file-2-2').parent().find('.upload__info').html('Вес файлов<br> превышает 25 МБ');
                $('#file-2-2').parent().find('.upload__box').find('.upload__caption').html('Выбрать <br>заново');
                $('#file-2-2').parent().find('.upload__file').addClass('error');
                sizes = 0;
                count_files = 0;
                $('#files-2-2-text').val('');
                jqXHR.abort();
            }
        }
    });
    $('#file-2-3').fileupload({
        url: 'load.php',
        sequentialUploads: true,
        change: function (e, data) {
            $('#file-2-3').parent().find('.upload__box').find('.upload__caption').html(caption);
            $('#file-2-3').parent().find('.upload__file').removeClass('error');
            if(data.files.length + count_files > max_files){
                $('.notice').text('Можно загрузить не более '+max_files+' файлов').addClass('active notice_warning').removeClass('notice_success');
                setTimeout(function(){
                    $('.notice').text('').removeClass('active');
                }, 2000);
                limit = true;
                $('#file-2-3').parent().find('.upload__info').addClass('error');
            } else {
                limit = false;
                count_files = count_files + data.files.length;
                $('#file-2-3').parent().find('.upload__info').removeClass('error');
                data.files.forEach(function(item, i, arr) {
                     sizes = sizes + item.size;
                });
            }
        },
        add: function (e, data) {

            var jqXHR = data.submit().success(function (result, textStatus, jqXHR) {
                let err = false
                for (let file of data.files) {
                    const nameArr = file.name.split('.')
                    if (nameArr[nameArr.length - 1] === 'php' || nameArr[nameArr.length - 1] === 'js' || nameArr[nameArr.length - 1] === 'ts') {
                        err = true
                        errType = true
                    }
                }
                if (err) {
                    jqXHR.abort()
                }
                $('#file-2-3').parent().find('.upload__info').text('Загружаем файлы');
            }).error(function (jqXHR, textStatus, errorThrown) {
                //console.log('Ошибка');
            }).complete(function (result, textStatus, jqXHR) {
                if(isJsonString(result)){
                    if (errType) {
                        $("#file-2-3").parent().find(".upload__info").addClass("error")
                        $("#file-2-3").parent().find(".upload__info").html("Недопустимый тип файла")
                        $("#file-2-3").parent().find(".upload__file").addClass("error")
                        $('#file-2-3').parent().find('.upload__box').find('.upload__caption').html('Выбрать <br>заново');
                    } else {
                        result = JSON.parse(result);
                        console.log(result.file);
                        var overallProgress = $('#file-2-3').fileupload('progress');
                        var activeUploads = $('#file-2-3').fileupload('active');
                        var files_text = $('#files-2-3-text').val();
                        $('#files-2-3-text').val(files_text + '[|]' + result.file);
                        files_text = $('#files-2-3-text').val();
                        console.log(files_text, '2-3');
                        $('#file-2-3').parent().find('.upload__info').text('Выбрано ' + count_files + ' файла(ов)');
                    }
                }
            });
        },
        send: function (e, data) {
            if(limit){
                jqXHR.abort();
            }
            if(sizes>25000000){
                $('#file-2-3').parent().find('.upload__info').addClass('error');
                $('#file-2-3').parent().find('.upload__info').html('Вес файлов<br> превышает 25 МБ');
                $('#file-2-3').parent().find('.upload__box').find('.upload__caption').html('Выбрать <br>заново');
                $('#file-2-3').parent().find('.upload__file').addClass('error');
                sizes = 0;
                count_files = 0;
                $('#files-2-3-text').val('');
                jqXHR.abort();
            }
        }
    });

    $('.phone-mask').on('keyup', function(){
        var val = $(this).val();
        /*if(val != '+7 (___)___-__-__'){
            $(this).next().removeClass('active');
        }*/
    });



    $('.phone-mask').mask('+7 (000)000-00-00', {
          clearIfNotMatch: true,
          onComplete: function(cep, e) {
            $(e.target).next().next().addClass('green');
            $(e.target).next().next().removeClass('error');
          },
          onKeyPress: function(cep, e, currentField, options){
              if(cep.length == 17){
                  $(e.target).next().next().addClass('green');
                  $(e.target).next().next().removeClass('error');
              } else {
                  $(e.target).next().next().addClass('error');
              }
              $(e.target).next().removeClass('active');
          },
          onInvalid: function(val, e, f, invalid, options){
            var error = invalid[0];
            $(e.target).next().next().addClass('error');
          }
    });
    $( ".phone-mask" ).focus(function(e) {
        $(this).attr('placeholder', '+7 (___)___-__-__');
        e.target.value.length || (e.target.value = "+7")
    });

    // form
    $('.form--js').submit(function(event){
        event.preventDefault();
        var form   = $(this),
            btn   = $(this).find('.form__btn span'),
            upload__info   = $(this).find('.upload__info'),
            btnDefault   = btn.text(),
                errors = true,
                notice = $('.notice');

        form.find('[type="text"][data-error], [type="email"][data-error], [type="tel"][data-error], textarea[data-error], [type="hidden"][data-error]').each(function(){
            if (errors) {
                var field = $(this);
                var val = field.val();
                var textError = field.attr('data-error');

                if(val.length < 17 ){
                    /*notice.text(textError).addClass('active notice_warning').removeClass('notice_success');
                    setTimeout(function(){
                        notice.text('').removeClass('active');
                    }, 2000);*/
                    field.next().addClass('active');
                    field.next().next().addClass('error');
                    errors = false;
                    field.focus();
                } else {
                    field.next().removeClass('active');
                    field.next().next().addClass('green').removeClass('error');
                }
            }
        });
        form.find('[type="checkbox"][data-error]').each(function(){
            if (errors) {
                var field = $(this);
                var val = field.val();
                var textError = field.attr('data-error');

                if(!field.prop('checked')){
                    notice.text(textError).addClass('active notice_warning').removeClass('notice_success');
                    field.addClass('error');
                    setTimeout(function(){
                        notice.text('').removeClass('active');
                    }, 2000);
                    errors = false;
                }
            }
        });

        if (errors) {
            btn.text('Отправляем...');
            $.fancybox.close()
            $.fancybox.open({loop: !1, src: "#loading-modal", baseClass: "dark-fancybox", touch: !1, animationEffect: !1});
            var $that = form,
            formData = new FormData($that.get(0)); // создаем новый экземпляр объекта и передаем ему нашу форму (*)
            $.ajax({
              contentType: false, // важно - убираем форматирование данных по умолчанию
              processData: false, // важно - убираем преобразование строк по умолчанию
              data: formData,
              type: 'POST',
              url: '/lp/mail.php',
              dataType: "json",
              success: function(json){
                  btn.text(btnDefault);
                  if(json){
                      $('.form--js').trigger('reset');
                      form.find('.upload__info').text('до 10 файлов не более 25 МБ');
                      form.find('.upload__info').removeClass('error');
                      form.find('[name="files"]').val('');
                      count_files = 0;
                      ym(52146985, "reachGoal", "thanks")
                      $.fancybox.close();
                      $.fancybox.open({loop: !1, src: "#application-modal", baseClass: "dark-fancybox", touch: !1, animationEffect: !1});
                  } else {
                      $.fancybox.close()
                      $.fancybox.open({loop: !1, src: "#error-modal", baseClass: "dark-fancybox", touch: !1, animationEffect: !1});
                      upload__info.text('Превышен размер файлов');
                  }

              }
            });

            return false;
        } else {
            return false;
        }

    });

});
