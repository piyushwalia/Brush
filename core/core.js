const electron = require('electron')
const path = require('path')
const os = require('os');
const BrowserWindow = electron.remote.BrowserWindow;
const fs = require("fs");
const ipc = electron.ipcMain
const shell = electron.shell
const variables = [];
const input_parent__cont = '<div class="variable_container"><span class="variable__name">';
const desktop_re = '.Desktop_Navigation__content .variable__name, .Desktop_Submenu__content .variable__name';
const forms_elem = '.forms__content .variable__name';

// console.log(process.env.PATH)


        $.getJSON('./variables/variables.json', function(data) {                               
                $.each(data, function(i,value){                    
                    $('#right_cont').append('<div id='+i+' class="box__container"><h2 class="var_title">'+i+'</h2><div class=" '+i+'__content  var_content"></div></div>');                                             
                    $.each(this, function(b, f) {                      
                    if (jQuery.isEmptyObject(f.comments))
                        {
                            const var_data = input_parent__cont +f.value.slice(1).replace(/[_\s]/g, ' ')+'</span><input type="text" name='+f.value+'  data-type='+f.data+' placeholder='+f.placeholder+'></div>';                                                    
                            $(var_data).appendTo('.' + i + '__content');
                        } 
                                                              
                    else{
                        const var_data = input_parent__cont +f.value.slice(1).replace(/[_\s]/g, ' ')+'</span><input type="text" name='+f.value+'  data-type='+f.data+' placeholder='+f.placeholder+'><div class="comments"><span class="info_icon"></span><p>'+f.comments+'</p></div></div>';                                                    
                        $(var_data).appendTo('.' + i + '__content');
                    }
                    // To remove the undefined value of placeholders
                    if($( "placeholder" ).empty()){
                        $('input[type="text').removeAttr('placeholder')
                    }
                    // To remove the desktop word from desktop variables
                    var desktop_var = /-desktop/gi;
                    $(desktop_re).contents().each(function() {                            
                        if (this.nodeType === 3 && desktop_var.test(this.nodeValue)) {
                            this.nodeValue = this.nodeValue.replace(desktop_var, '');
                        }
                    });
                    var forms_var = /form-element-/gi;
                    $(forms_elem).contents().each(function() {                            
                        if (this.nodeType === 3 && forms_var.test(this.nodeValue)) {
                            this.nodeValue = this.nodeValue.replace(forms_var, '');
                        }
                    });
                    $("[data-type='select']").replaceWith(function () {
                        return $('<select name='+f.value+'><option>true</option><option>false</option></select>', {
                            html: $(this).html()
                        });
                    });                                                         
                 });                                                             
                });

          
                
                const list = document.querySelectorAll("[data-type='color']");
                for (let i = list.length; i--;) {
                    list[i].className = list[i].className + 'jscolor {required:false,refine:false, hash:true,  borderWidth:0 }';
                }                
                jscolor.installByClassName("jscolor");   

                // Paste button added and getting the updated color value
                const paste_button = "<span class='paste_button'>Paste</span>";               
                const paste_container = $('input.jscolor');                
                paste_container.after(paste_button);     

                $('input.jscolor').on('focusin focusout', function(e) {
                    if(!$.trim(this.value).length) {  
                        var toast = $('<div class="color_display"></div>')
                        $('body').append(toast);
                        toast.css('background-color','red').fadeIn(400).delay(1000).fadeOut(400);                                        
                        setTimeout(function() {toast.remove();}, 1100);                        
                        e.preventDefault();                                                                  
                    }                                                            
                    else{
                        var copied_jcss = $(this).attr("style"),
                        copied_jvalue = $(this).val();                                                
                        $('.copy_value').text(copied_jvalue).attr("style",copied_jcss);                                                
                    }
                });

                // accordian 
                let var_title = $('.var_title');
                let var_content = $('.var_content');                
                var_title.toggleClass('vr-inactive');
                var_content.toggleClass('vr-closed');                                
                 var_title.click(function () {                
                    if($(this).is('.vr-inactive')) {
                        $('.vr-active').toggleClass('vr-active vr-inactive').next().slideToggle().toggleClass('vr-open');
                        $(this).toggleClass('vr-active vr-inactive');
                        $(this).next().slideToggle().toggleClass('vr-open');
                    }
                    else {
                        $(this).toggleClass('vr-active vr-inactive');
                        $(this).next().slideToggle().toggleClass('vr-open');
                    }
                }); 
                
                // Pasting value copied to input and changing color according to text entered
                $('.paste_button').on('click', function(e){                            
                    if ($(".copy_value").html().length > 0) {
                        var rgb = [255, 0, 0];
                        rgb[0] = Math.round(Math.random() * 255);
                        rgb[1] = Math.round(Math.random() * 255);
                        rgb[2] = Math.round(Math.random() * 255);
                            
                        var o = Math.round(((parseInt(rgb[0]) * 299) +
                                            (parseInt(rgb[1]) * 587) +
                                            (parseInt(rgb[2]) * 114)) / 1000);
                        var fore = (o > 125) ? 'black' : 'white';
                        var back = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';                    
                        var copied_css = $('.copy_value').attr("style"),
                        copied_value = $('.copy_value').text();                            
                        $(this).prev().val(copied_value).attr("style",copied_css)                                                
                        e.preventDefault();
                    }
                    else{
                        alert('Please select Value before Pasting')
                    }                                                                                                                
            });                
        });

        // Uploading Image and getting colors from it
        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                
                reader.onload = function (e) {
                    $('#uploaded__image').attr('src', e.target.result);                    
                    $("img").chameleon("getImageColors", {
                        "sort_type": "disabled",
                        "color_format": "hex",
                        "img_src": "",
                        "color_alpha": 200,
                        "color_difference": 120,
                        "canvas_side": 400,
                        "debug": false,
                        "onGetColorsSuccess": function(colors, $container, s) { 
                          var $colors = jQuery.fn.chameleon('wrapColor', colors, s.color_format); 
                          jQuery('._example-GETIMAGECOLORS_full-container .chmln-demo__colors').html($colors); 
                          $container.removeClass('_loading').addClass('_done').siblings().removeClass('_done'); 
                          $('.chmln__colors-elem').on('click', function(){
                              // var to get css attributes
                            var dd= $(this).attr("style");
                            // var to get # value
                            var hash_color = $(this).text();
                            $('.copy_value').text(hash_color).attr("style",dd);                                
                        });
                        },
                        "onGetColorsError": function(colors, $container, s, img_src) { 
                          jQuery('._example-GETIMAGECOLORS_full- container .chmln-demo__colors').html('Error occurred on getting colors!'); 
                          alert('Please upload correct Image Format like JPG or PNG!'); 
                        },                        
                      });
                }
                
                reader.readAsDataURL(input.files[0]);
                
            }
        }
        
        $("#upload__file").change(function(){
            readURL(this);
        });
        $('#upload__file').on('click', function(){
            $('.upload_container').addClass('right_panel--active');
            $('#right_cont').addClass('left_panel--active');
        })      


        // Variables extra data added for reference
        

   


        // Exporting theme file
        document.getElementById("create_file").addEventListener("click", () => {
            let content='';                               
            var var__id = document.querySelectorAll('.box__container');
            for(var var__index in var__id) {
                var var__id_get = var__id[var__index].id;
                if(var__id_get != undefined) {
                    content += '\n'+'//'+var__id_get+'\n';                      
                    var input__values = document.querySelectorAll('#'+var__id_get+' input[type="text"] , #'+var__id_get+' select' );
                    for(var i in input__values){       
                        if(input__values.length>= parseInt(i)  && input__values[i].value!='' && input__values[i].value!='true'){
                            content += input__values[i].name + ':' +  input__values[i].value + ';'+'\n';      
                        }                                             
                    }
                    
                }
            }
            const file_path = path.join(os.tmpdir(), '_theme.less')
            fs.writeFile(file_path, content, function(err) {
                shell.openExternal('file://' + file_path)
                if(err) {
                    return console.log(err);
                } 
                alert(' _theme.less file saved successfully!');                        
            }); 
        });
        