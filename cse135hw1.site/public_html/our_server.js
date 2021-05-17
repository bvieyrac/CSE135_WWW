const express = require('express');
const app = express();
const { MongoClient } = require("mongodb");
// const mongo_uri = "mongodb://165.232.146.217/testDb";    // local file
// const mongo_uri = "mongodb://165.232.146.217";           // manual 
const mongo_uri = "mongodb+srv://timo:timo123@cse135hw.yu5zy.mongodb.net/guiDB";
const port = 3001;
const db_path = "./our_db.json";
var fs = require("fs");

// get our db
var text = fs.readFileSync(db_path);
var curJsonData = JSON.parse(text);



/* Get our mongoDB */
const client = new MongoClient(mongo_uri);
// const db_name = "analyticsDB";   // manual
const db_name = "guiDB";            // gui

/* function to store data in our db */
// GET all 
// const getData = (curData, requestType) => {
//             const data = requestType in curJsonData ? curJsonData[requestType] : [];
//             return data;
// };

const getDataMongo = async (requestType) => {
            await client.connect();

            // TODO: need to change "testDb" to "<official_db_name>"
            const database = client.db(db_name); 
            const data = await database.collection(requestType).find().toArray();

            console.log(`DATA FROM MONGO:`);
            console.log(data);
            

            return data;
};

// GET with ID
const getDataMongoWithID = async (requestType, id) => {
            await client.connect();

            const database = client.db(db_name);
            const query = {userCookie: `${id}`};
            const data = await database.collection(requestType).find(query).toArray();
            const result = data[0];

            console.log("DATA FROM MONGO ID:");
            console.log(data);   

            

            return result;
}

// POST
const storeData = (curData, data, reqType, path, id) => {
            try {
                        if(reqType in curData) curData[reqType].push(data);
                        else {
                                    curData[reqType] = [];
                                    curData[reqType].push(data);
                        }
                        fs.writeFileSync(path, JSON.stringify(curData, null, 4));
            } catch (err) {
                        console.error(err);
            }
}

const storeDataMongo = async (data, reqType) => {
            await client.connect();
            const database = client.db(db_name);

            const id = data.userCookie;
            const query = {userCookie: `${id}`};
            const update = {$set: data};
            const options = {upsert:true};

            const postedData = await database.collection(reqType).updateOne(query, update, options);

            console.log("STORE MONGO Posted Data:");
            console.log(postedData);

            return postedData;
}

// UPDATE
const updateDataWithID = async (reqType, data, id) => {
            await client.connect();
            const database = client.db(db_name);

            const query = {userCookie: `${id}`};
            const update = {$set: data};
            const options = {upsert:true};
            
            const postedData = await database.collection(reqType).updateOne(query, update, options);

            console.log("UPDATE MONGO Posted Data:");
            console.log(postedData);

            return postedData;
}

// DELETE
const deleteDataWithID = async (reqType, id) => {
            await client.connect();
            const database = client.db(db_name);

            const query = {userCookie: `${id}`};

            await database.collection(reqType).deleteOne(query, (err, result) => {
                        if (err) console.error(err);
                        else console.log("1 document Deleted!");
            });
}

app.use(express.json());

/* Testings for post & get */
// app.post('/posts', (req, res) =>{
//             storeData(curJsonData, req.body, 'posts', db_path);
//             console.log(req.body);
//             res.status(200).end();
            
// });

// app.get('/posts', (req, res) => {
//             res.status(200).json(JSON.stringify(curJsonData, null, 4));
// });
/* Testing END */

/* STATIC DATA */
// post
app.post('/static', (req, res) =>{
            var requestType = 'static';
            const postedData = storeDataMongo(req.body, requestType);
            res.status(200).json(postedData);
});

// get all
app.get('/static', async (req, res) => {
            var requestType = 'static';
            /* Testing */
            // var staticData = getData(curJsonData, requestType);
            /* MongoDB */
            var staticData = await getDataMongo(requestType);

            res.status(200).json(JSON.stringify(staticData, null, 4));
});

// get with id
app.get('/static/:id', async (req, res) => {
            var requestType = 'static';
            var itemID = req.params.id;
            /* MongoDB */
            var staticData = await getDataMongoWithID(requestType, itemID);

            res.status(200).json(JSON.stringify(staticData, null, 4));
});

// PUT
app.put('/static/:id', async (req, res) => {
            const requestType = 'static';
            const itemID = req.params.id;
            const staticData = await updateDataWithID(requestType, req.body, itemID);
            res.status(200).json(JSON.stringify(staticData, null, 4));
});

// delete
app.delete('/static/:id', async (req, res) => {
            const requestType = 'static';
            const itemID = req.params.id;
            await deleteDataWithID(requestType, itemID);
            res.status(200).end();
});

/* PERFORMANCE DATA */
// post
app.post('/performance', (req, res) =>{
            var requestType = 'performance';
            const postedData = storeDataMongo(req.body, requestType);
            res.status(200).json(postedData);
});

// get all
app.get('/performance', async (req, res) => {
            var requestType = 'performance';
            /* Testing */
            // var performanceData = getData(curJsonData, requestType);
            /* MongoDB */
            var performanceData = await getDataMongo(requestType);

            res.status(200).json(JSON.stringify(performanceData, null, 4));
});

// get with id
app.get('/performance/:id', async (req, res) => {
            var requestType = 'performance';
            var itemID = req.params.id;
            /* MongoDB */
            var performanceData = await getDataMongoWithID(requestType, itemID);

            res.status(200).json(JSON.stringify(performanceData, null, 4));
});

// PUT
app.put('/performance/:id', async (req, res) => {
            const requestType = 'performance';
            const itemID = req.params.id;
            const performanceData = await updateDataWithID(requestType, req.body, itemID);
            res.status(200).json(JSON.stringify(performanceData, null, 4));
});

// delete
app.delete('/performance/:id', async (req, res) => {
            const requestType = 'performance';
            const itemID = req.params.id;
            await deleteDataWithID(requestType, itemID);
            res.status(200).end();
});

/* ACTIVITY DATA */
// post
app.post('/activity', (req, res) =>{
            var requestType = 'activity';
            const postedData = storeDataMongo(req.body, requestType);
            res.status(200).json(postedData);
});

// get all
app.get('/activity', async (req, res) => {
            var requestType = 'activity';
            /* Testing */
            // var activityData = getData(curJsonData, requestType);
            /* MongoDB */
            var activityData = await getDataMongo(requestType);
            res.status(200).json(JSON.stringify(activityData, null, 4));
});

// get with id
app.get('/activity/:id', async (req, res) => {
            var requestType = 'activity';
            var itemID = req.params.id;
            /* MongoDB */
            var activityData = await getDataMongoWithID(requestType, itemID);

            res.status(200).json(JSON.stringify(activityData, null, 4));
});

// PUT
app.put('/activity/:id', async (req, res) => {
            const requestType = 'activity';
            const itemID = req.params.id;
            const activityData = await updateDataWithID(requestType, req.body, itemID);
            res.status(200).json(JSON.stringify(activityData, null, 4));
});

// delete
app.delete('/activity/:id', async (req, res) => {
            const requestType = 'activity';
            const itemID = req.params.id;
            await deleteDataWithID(requestType, itemID);
            res.status(200).end();
});

app.listen(port);

/* MongoDB notes */
/*

            // important ones
            -> db.some_collection.find();
            -> db.some_collection.find().pretty();
            -> db.some_collection.update({title:"testing1"}, {$set:{title:"changed testing"}});
;
            - they create unique id for each item for us (sessionizing)

            - $set => keep everything and add the new entry

            - $unset => just do {field1: <anyIntValue>}

            - $upsert @ 21:04

            - $rename field @ 22:08

            - .remove() @ 22:38
                        -> justOne

            - $or @ 25:00

            - lt, gt, lte, gte @26:30

            - sorting @ 28:39

            - .count() @ 30:08

            - .limit()

            - .forEach @31:05

*/