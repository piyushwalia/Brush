const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow;
const fs = require("fs");
const variables = [];
const input_parent__cont = '<div class="variable_container"><span>';

        $.getJSON('./variables/variables.json', function(data) {
                var json_tabs = [
                    data.base_variables,
                    data.button_variables,                
                ];
                var parent_cont =  [
                    'core_variables', 
                    'button_variables'
                ];

                $.each(parent_cont, function(i,value){                    
                    $('#right_cont').append('<div id='+value+'></div>');                       
                });

                $.each(json_tabs, function (im,dm) {                                                                               
                    $.each(this, function(i, f) {
                        var var_data = input_parent__cont +f.name+'</span><input type="text" name='+f.value+'  data-type='+f.data+'></div>';                            
                          $(var_data).appendTo('#'+parent_cont[im]);                                                          
                    });                    
                });
                
                var list = document.querySelectorAll("[data-type='color']");
                for (var i = list.length; i--;) {
                    list[i].className = list[i].className + 'jscolor {required:false,refine:false, hash:true}';
                }                
                jscolor.installByClassName("jscolor");   

                // copy button added
                const paste_button = "<span class='paste_button'>Paste</span>"
                const paste_container = $('.variable_container')
                paste_container.append(paste_button);     
 
             
                $('input[type="text').focusin(  
                    function(){  
                        if(!$.trim(this.value).length) {                    
                        }                                                            
                        else{
                            var copy_value = $(this).val(); 
                            $('.copy_value').text(copy_value);                            
                        }
                    }).focusout(  
                    function(){  
                        if(!$.trim(this.value).length) {                    
                        }                                                            
                        else{
                            var copy_value = $(this).val(); 
                            $('.copy_value').text(copy_value);                                          
                        }
                });
                    

                    $('.paste_button').on('click', function(){                        
                          
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