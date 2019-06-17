const express = require('express');
const app = express();
const PORT = process.env.PORT || 9001;
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const http = require('http');



// ###########   1. basic example 
/*  

if(cluster.isMaster) {
    masterProcess();
} else {
    childProcess();
}

function masterProcess() {
    console.log(`Master ${process.pid} is running`);
    for(let i = 0; i < numCPUs; i++) {
        console.log(`Forking process number ${i}...`);
        cluster.fork();
    }
    process.exit();
}

function childProcess() {
    console.log(`Worker ${process.pid} started and finished`);
    process.exit();
}

// ###########   1. end of basic example
*/

// ########## 2nd one with http or express server

/*
if(cluster.isMaster) {
    masterProcess();
} else if(cluster.isWorker) {
    childProcess();
}


function masterProcess() {
    console.log(`Master ${process.pid} is running`);

    for(let i = 0; i < numCPUs; i++) {
        console.log(`Forking process number ${i}...`);
        cluster.fork();
    }

    // process.exit(); // it will finish the task
}

function childProcess() {
    console.log(`Worker ${process.pid} started`);


    app.listen(PORT,() => {
        console.log(`******** server running at ${PORT}`);
    });

    app.get('/',(req, res) => {
        res.status(200).json({msg: 'Hello'});
    });
    // process.exit(); // it will finish the worker process
}
*/

// ########## end of 2nd one with http or express server

// ################ start of with PM2
/*

console.log(`Worker ${process.pid} started...`);

http.createServer((req,res) => {
    res.writeHead(200);
    res.end('Hello World');

    process.exit(1);
}).listen(3000);

// pm2 start index.js -i 0
// ################# end of with PM2

*/


// ######### start of  Comunicating master and worker processes

if(cluster.isMaster) {
    masterProcess();
} else {
    childProcess();
}



function masterProcess() {
    let workers = [];

    console.log(`Master ${process.pid} is running`);
    for(let i = 0; i < numCPUs; i++) {
        console.log(`Forking process number ${i}...`);
        const worker= cluster.fork(); 
        
        workers.push(worker);        
    }

    //send messages to workers
    workers.map(worker => {
       
        //send message from master
        
        // From the master process,we can send a message to a worker process using the process reference,i.e.someChild.send({... })
        console.log(`Master ${process.pid} send message to worker ${worker.process.pid}`)
        worker.send({msg: `Message from master ${process.pid}`});

       
       
        
       // listening message from worker

        //we can place listen logic inside for loop numCPUs or workers loop
        worker.on('message',(message) => {
            console.log(`master ${process.pid} receives message ${JSON.stringify(message)} from ${worker.process.pid}`);
        });
        
    
    }, this);   
  
}

function childProcess() {
    console.log(`Worker ${process.pid} started and finished`);

    //listening message from master
    // we listen for the message event registering a listener with the process.on('message', handler) method. 
    process.on('message',(message) => {
        console.log(`Worker ${process.pid} receives message ${JSON.stringify(message)}`);
    });

    //send message to master
    console.log(`Worker ${process.pid} sends message to master...`);
    process.send({msg: `Message from worker ${process.pid}`});
   
}



// ######### END of Comunicating master and worker processes