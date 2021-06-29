async function fetchData(){ 
await fetch('https://www.cse135hw1.site/api/performance',{
            method: 'GET',
            headers: {
                        'Content-Type': 'application/json',
                        /* Don't need this because no Basic Auth on www.reporting.cse135hw1.site */
                        // 'Authentication': 'Basic ' + btoa('timo' + ":" + 'timo123'),
            },
            // keepalive: true
})
.then(response => response.json())
.then(sentData => {
            const jsonData = JSON.parse(sentData);
            // const tracker = {}; // object of (language and corresponding index in result)
            // const result = [];  // array of objects of language and count

            // for(let i = 0; i < jsonData.length; i++){
            // const lang = `${jsonData[i].userLang}`.toLowerCase();
            

            // if(tracker[lang] !== undefined) result[tracker[lang]].count++;
            // else {
            //             const newEntry = {
            //             "lang": lang,
            //             "count": 1
            //             };

            //             result.push(newEntry);
            //             tracker[lang] = result.length-1;
            // }
            // }

            // const languages = [];
            // const values = [];

            // // sort results by numbers
            // result.sort(compare);

            // console.log(result);

            // for(let d of result){

            // console.log("********");
            // console.log(d);

            // languages.push(d['lang']);
            // values.push(d['count']);
            // }

            /* Categories */
            // Fast (0-2000ms)
            var fast = 0;
            // Mediocre (2001-3000ms)
            var medium = 0;
            // Slow (3000ms+)
            var slow = 0;

            for(let i = 0; i < jsonData.length; i++){
                        if(jsonData[i].loadTime == null) continue;
                        const loadTime = jsonData[i].loadTime;

                        if(loadTime < 2000) fast++;
                        else if(loadTime < 3000) medium++;
                        else slow++;
            }

            console.log(`fast = ${fast}`);
            console.log(`medium = ${medium}`);
            console.log(`slow = ${slow}`);

            /* Pie Chart 1 */
            const pie1 = {
                        type: "pie",
                        plot: {
                                    borderColor: "#2B313B",
                                    borderWidth: 5,
                                    // slice: 90,
                                    valueBox: {
                                    placement: 'out',
                                    text: '%t\n%npv%',
                                    fontFamily: "Open Sans"
                                    },
                                    tooltip: {
                                                fontSize: '18',
                                                fontFamily: "Open Sans",
                                                padding: "5 10",
                                                text: "%npv%"
                                    },
                                    animation: {
                                                effect: 2,
                                                method: 5,
                                                speed: 900,
                                                sequence: 1,
                                                delay: 3000
                                    }
                        },
                        source: {
                                    text: 'gs.statcounter.com',
                                    fontColor: "#8e99a9",
                                    fontFamily: "Open Sans"
                        },
                        title: {
                                    text: 'User Load Time',
                                    // align: "left",
                                    // offsetX: 10,
                                    fontFamily: "Open Sans",
                                    fontSize: 30
                        },
                        plotarea: {
                                    margin: '100 0 0 0'
                        },
                        series: [
                                    {
                                                values: [fast],
                                                text: "Good (0-2000ms)",
                                                backgroundColor: '#50ADF5',
                                    },
                                    {
                                                values: [medium],
                                                text: "Mediocre (2000-3000ms)",
                                                backgroundColor: '#FF7965',
                                    },
                                    {
                                                values: [slow],
                                                text: 'Slow (3000ms or above)',
                                                backgroundColor: '#FFCB45',
                                    },
                        ]};

            var myConfig = {
                        "graphset": [pie1]
            };
                        
            zingchart.render({
                        id: 'myChart3',
                        data: myConfig,
                        height: '100%',
                        width: '100%'
                        });
            })
.catch(error => {
            console.log("Error, data not sent:", error);
});
}

function compare(a,b){
if(a.count < b.count){
            return 1;
}
if(a.count > b.count){
            return -1;
}
return 0;
}

console.log("About to fetch data from MongoDB for LANGUAGE...")
fetchData();
