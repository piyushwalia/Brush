const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow;
const fs = require("fs");
const variables = [];
const input_parent__cont = '<div class="variable_container"><span>';



        $.getJSON('./variables/variables.json', function(data) {                               
                $.each(data, function(i,value){                    
                     $('#right_cont').append('<div id='+i+'><h2 class="var_title">'+i+'</h2><div class=" '+i+'__content  var_content"></div></div>');                                             
                     $.each(this, function(b, f) {
                        const var_data = input_parent__cont +f.name+'</span><input type="text" name='+f.value+'  data-type='+f.data+'></div>';                                                    
                          $(var_data).appendTo('.' + i + '__content');
                    });     
                });

              
                
                let list = document.querySelectorAll("[data-type='color']");
                for (let i = list.length; i--;) {
                    list[i].className = list[i].className + 'jscolor {required:false,refine:false, hash:true,  borderWidth:0 }';
                }                
                jscolor.installByClassName("jscolor");   

                // copy button added
                const paste_button = "<span class='paste_button'>Paste</span>"
                const paste_container = $('.variable_container')
                paste_container.append(paste_button);     

                $('input[type="text').on('focusin focusout', function(e) {
                    if(!$.trim(this.value).length) {  
                        var toast = $('<div class="color_display"></div>')
                        $('body').append(toast);
                        toast.css('background-color','red').fadeIn(400).delay(1000).fadeOut(400);                                        
                        setTimeout(function() {toast.remove();}, 1100);                        
                        e.preventDefault();                  
                        console.log('non')                        
                    }                                                            
                    else{
                        let copy_value = $(this).val(); 
                        $('.copy_value').text(copy_value);                            
                        console.log(copy_value)
                    }
                });
                let var_title = $('.var_title');
                let var_content = $('.var_content');                

                var_title.toggleClass('vr-inactive');
                var_content.toggleClass('vr-closed');                
                var_title.first().toggleClass('vr-active vr-inactive');
                var_content.first().toggleClass('vr-open vr-closed').slideDown();
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
                        
                            var copied_value = $('.copy_value').text();                    
                            $(this).prev().val(copied_value).css({"background-color": copied_value, "color": fore})
                            e.preventDefault();
                        }
                        else{
                            alert('Please select Value before Pasting')
                        }                                                                                                                
                });


        });


       

        document.getElementById("create_file").addEventListener("click", () => {
            let content='';      
        
            var x = document.querySelectorAll('input, select');
                for(var i in x){       
                    if(x.length>= parseInt(i)  && x[i].value!=''){
                        content += x[i].name + ':' +  x[i].value + ';'+'\n';      
                }}
                fs.writeFile("_theme.less", content, function(err) {
                    if(err) {
                        return console.log(err);
                    } 
                console.log("The file was saved!");
            }); 
        });
        
        const upload_src = document.getElementById('upload_mockup')

        upload_src.addEventListener('click', function (event) {
            const modalPath = path.join('file://', __dirname, '/views/upload_Image.html')
            let win = new BrowserWindow({
                 width: 800,
                height: 600,
                alwaysOnTop: true,
            })
            win.on('close', function () { win = null })
            win.loadURL(modalPath)
            win.show() 
        });