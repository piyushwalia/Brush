const electron = require('electron')
        const path = require('path')
        const BrowserWindow = electron.remote.BrowserWindow;



       const variables = [];
            $.getJSON('./variables/variables.json', function(data) {
                $.each(data.base_variables, function(i, f) {
                    var var_data = '<div class="color_input"><span>'+f.name+'</span><input type="text" name='+f.value+' value="" data-type='+f.data+'></div>'
                        $(var_data).appendTo("#base");
                });
                $.each(data.button_variables, function(i, f) {
                    var var_data = '<div class="color_input"><span>'+f.name+'</span><input type="text" name='+f.value+' value="" data-type='+f.data+'></div>'
                        $(var_data).appendTo("#base");
                });

        });
       
        const fs = require("fs");
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
        const notifyBtn = document.getElementById('notifyBtn')
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

        
        // Jquery code
        // document.getElementById("create_file").addEventListener("click", () => {
        //     let content='';      
                   
        //     var x = document.getElementsByTagName('input');


        //     for(var i in x){
        //         //console.log( parseInt(i), typeof  x.length);
        //         if(x.length>= parseInt(i)  && x[i].value!=''){
        //             content += x[i].name + ':' +  x[i].value + ';'+'\n';      
        //     }}

        //     // x.forEach(function(k,value) {
        //     //     console.log(k,value);
        //     // });
        //     //     $.each(x, function(i, field){
        //     //         if(field.value!==''){
        //     //         content += field.name + ':' +  field.value + ';'+'\n';      
        //     //         }
        //     // });
            
        //     fs.writeFile("variable.less", content, function(err) {
        //     if(err) {
        //         return console.log(err);
        //     }
        //         console.log("The file was saved!");
        //     }); 
                
        //     });
