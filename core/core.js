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
                    console.log(parent_cont);
                });

                $.each(json_tabs, function (im,dm) {                                                                               
                    $.each(this, function(i, f) {
                        var var_data = input_parent__cont +f.name+'</span><input type="text" name='+f.value+'  data-type='+f.data+'></div>';                            
                          $(var_data).appendTo('#'+parent_cont[im]);                                                          
                    });                    
                });
                
                var list = document.querySelectorAll("[data-type='color']");
                for (var i = list.length; i--;) {
                    list[i].className = list[i].className + 'jscolor {required:false,hash:true}';
                }                
                jscolor.installByClassName("jscolor");
        });
        
        document.getElementById("create_file").addEventListener("click", () => {
            let content='';      
        
            var x = document.getElementsByTagName('input');
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
        
        const notifyBtn = document.getElementById('upload_mockup')

        notifyBtn.addEventListener('click', function (event) {
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