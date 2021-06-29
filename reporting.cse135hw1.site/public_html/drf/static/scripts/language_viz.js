async function fetchData(){ 
  await fetch('https://www.cse135hw1.site/api/static',{
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
            const tracker = {}; // object of (language and corresponding index in result)
            const result = [];  // array of objects of language and count

            for(let i = 0; i < jsonData.length; i++){
              const lang = `${jsonData[i].userLang}`.toLowerCase();
              

              if(tracker[lang] !== undefined) result[tracker[lang]].count++;
              else {
                const newEntry = {
                  "lang": lang,
                  "count": 1
                };

                result.push(newEntry);
                tracker[lang] = result.length-1;
              }
            }

            const languages = [];
            const values = [];

            // sort results by numbers
            result.sort(compare);

            console.log(result);

            for(let d of result){

              console.log("********");
              console.log(d);

              languages.push(d['lang']);
              values.push(d['count']);
            }

            var myConfig = {
              "graphset": [{
                "type": "bar",
                "background-color": "white",
                "title": {
                  "text": "User Languages Count",
                  "font-size": "30px",
                  "alpha": 1,
                  "adjust-layout": true,
                },
                "plotarea": {
                  "margin": "dynamic"
                },
		/*
                "legend": {
                  "layout": "x3",
                  "overflow": "page",
                  "alpha": 0.05,
                  "shadow": false,
                  "align": "center",
                  "adjust-layout": true,
                  "marker": {
                    "type": "circle",
                    "border-color": "none",
                    "size": "10px"
                  },
                  "border-width": 0,
                  "maxItems": 3,
                  "toggle-action": "hide",
                  "pageOn": {
                    "backgroundColor": "#000",
                    "size": "10px",
                    "alpha": 0.65
                  },
                  "pageOff": {
                    "backgroundColor": "#7E7E7E",
                    "size": "10px",
                    "alpha": 0.65
                  },
                  "pageStatus": {
                    "color": "black"
                  }
                },
		*/
                "plot": {
                  "bars-space-left": 0.15,
                  "bars-space-right": 0.15,
                  "animation": {
                    "effect": "ANIMATION_SLIDE_BOTTOM",
                    "sequence": 0,
                    "speed": 800,
                    "delay": 800
                  }
                },
                "scale-y": {
                  "line-color": "#7E7E7E",
                  "item": {
                    "font-color": "#7e7e7e"
                  },
                  "values": "0:60:10",
                  "guide": {
                    "visible": true
                  },
                  "label": {
                    "text": "# of Users",
                    "bold": true,
                    "font-size": "20px",
                  },
                },
                "scaleX": {
                  "values": languages,
                  "placement": "default",
                  "tick": {
                    "size": 58,
                    "placement": "cross"
                  },
                  "itemsOverlap": true,
                  "item": {
                    "offsetY": -55
                  }
                },
                "series": [{
                  "values": values,
                  "alpha": 0.95,
                  "borderRadiusTopLeft": 7,
                  "background-color": "purple",
                }]
              }]
            };
             
            zingchart.render({
              id: 'myChart2',
              data: myConfig,
              height: '100%',
              width: '50%'
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
