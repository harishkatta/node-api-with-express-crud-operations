const fs = require('fs');
const express= require('express');
const app =express();
app.get('/', (req, res) => {
    res.send('hello world');
    fs.readFile('TestFile.txt', (err, data) => {
        if (!err){
            console.log(data.toString());
            // if we doesn't concat it will replace with new text
            fs.writeFile('TestFile.txt', `${data.toString()} + Hello World!`, function (err) {
                if (err)
                    console.log(err);
                else
                    console.log('Write operation complete.');
            });
        }
        else
            console.log('error while reading file', err);
    });
    fs.open('TestFile.txt', 'r', (err, fd) => {
        console.log("fd ", fd);
        //fd is our file descriptor
    });
    
   
    var data = fs.readFileSync('TestFile.txt', 'utf8');
    console.log(data.toString());

    //it will delete file 
    fs.unlink('TestFile.txt', function () {
        console.log('write operation complete.');
    });

   
})

app.listen(9000, () => console.log('server listen at 9000 port'));