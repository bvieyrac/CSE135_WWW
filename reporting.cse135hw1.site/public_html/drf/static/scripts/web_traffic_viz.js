// TODO: About to see what "data" looks like. Remember to uncomment the INITIAL CODE and plug in data using .map()
async function fetchData(){ 
  var tempData;
  await fetch('https://www.cse135hw1.site/api/activity',{
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

            /* Get Last 6 months */
            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            // get today's date
            const today = new Date();
            // array for containing strings of the last 6 months
            const last_6_months = [];
            var min_seconds = 0;
            var last_6_months_seconds = [];
            // array for data for each of the last 6 months
            const data = [];

            /* Get ALL the months in the past six months including CURRENT month */
            // Meaning we will have threshold set at the next month's first day since we are checking it by
            // if current time is less than the next month, if it is, it is the current month.
            for(var i = 6; i > 0; i--){
              let d = new Date(today.getFullYear(), today.getMonth() - i + 2, 1);
              let month = monthNames[d.getMonth()];
              let year = today.getFullYear();

              // get the time in seconds since 1970 for the month 6 months ago from today
              if(i === 6){
                min_seconds = d.getSeconds();
              }

              console.log(year);
              console.log(month);

              const newDict = {
                'year': year,
                'month':  month,
                'main_count': 0,
                'timo_count': 0,
                'bradley_count': 0
              };

              data.push(newDict);
              last_6_months.push(month);

              // get the current month's elapsed time since 1970 in ms
              last_6_months_seconds.push(d.getTime());
            }

            for(let i = 0; i < jsonData.length; i++){
              const link = jsonData[i].userLastPage;
              const time = jsonData[i].userLeftTime;

              if(time < min_seconds) {
                continue;
              }

              // check which site to increment
              var site = "bradley_count";
              if(link === "https://www.cse135hw1.site/members/bradley.html") site = "bradley_count";
              else if(link === "https://www.cse135hw1.site/members/timo.html") site = "timo_count";
              else if(link === "https://www.cse135hw1.site/") site = "main_count";

              // increment the count in the corresponding date month
              for(let j = 1; j < 6; j++){
                if(time < last_6_months_seconds[j]){
                  data[j-1][site]++;
                  break;
                }
              }
            }

            var myConfig = {
              "type": "line",
              "utc": true,
              "title": {
                "text": `Webpage Traffic From ${data[0].year}-${data[0].month} ~ ${data[5].year}-${data[5].month}`,
                "font-size": "20px",
                "adjust-layout": true
              },
              "plotarea": {
                "margin": "dynamic 45 60 dynamic",
              },
              "legend": {
                "layout": "float",
                "background-color": "none",
                "border-width": 0,
                "shadow": 0,
                "align": "center",
                "adjust-layout": true,
                "toggle-action": "remove",
                "item": {
                  "padding": 7,
                  "marginRight": 17,
                  "cursor": "hand"
                }
              },
              'scale-x': {
                labels: last_6_months.slice(0, last_6_months.length-1),
                item: {
                  'max-chars':3
                },
                tooltip: {
                  text: "%v 2016",
                  'font-size':12,
                  'font-family': "Georgia",
                  'font-color': "red",
                  'border-width': 1,
                  'border-color': "red",
                  'border-radius': "5px",
                  'background-color': "#ffe6e6",
                  padding: "10%"
                }
              },
              "scale-y": {
                "line-color": "#f6f7f8",
                "shadow": 0,
                "guide": {
                  "line-style": "dashed"
                },
                "label": {
                  "text": "Page Views",
                  "font-size": "20px",
                },
                "minor-ticks": 0,
                "thousands-separator": ","
              },
              // "scale-x": {
              //   "min-value": 1383292800000,
              //   "shadow": 0,
              //   "step": 3600000,
              //   "transform": {
              //     "type": "date",
              //     "all": "%D, %d %M<br />%h:%i %A",
              //     "guide": {
              //       "visible": false
              //     },
              //     "item": {
              //       "visible": false
              //     }
              //   },
              //   "label": {
              //     "visible": false
              //   },
              //   "minor-ticks": 0
              // },
              "crosshair-x": {
                "line-color": "#efefef",
                "plot-label": {
                  "border-radius": "5px",
                  "border-width": "1px",
                  "border-color": "#f6f7f8",
                  "padding": "10px",
                  "font-weight": "bold"
                },
                "scale-label": {
                  "font-color": "#000",
                  "background-color": "#f6f7f8",
                  "border-radius": "5px"
                }
              },
              "tooltip": {
                "visible": false
              },
              "plot": {
                "highlight": true,
                "tooltip-text": "%t views: %v<br>%k",
                "shadow": 0,
                "line-width": "2px",
                "marker": {
                  "type": "circle",
                  "size": 3
                },
                "highlight-state": {
                  "line-width": 3
                },
                "animation": {
                  "effect": 1,
                  "sequence": 2,
                  "speed": 100,
                }
              },
              "series": [{
                  "values": data.slice(0, data.length-1).map(d => d['main_count']),
                  "text": "Main Page",
                  "line-color": "#007790",
                  "legend-item": {
                    "background-color": "#007790",
                    "borderRadius": 5,
                    "font-color": "white"
                  },
                  "legend-marker": {
                    "visible": false
                  },
                  "marker": {
                    "background-color": "#007790",
                    "border-width": 1,
                    "shadow": 0,
                    "border-color": "#69dbf1"
                  },
                  "highlight-marker": {
                    "size": 6,
                    "background-color": "#007790",
                  }
                },
                {
                  "values": data.slice(0, data.length-1).map(d => d['timo_count']),
                  "text": "Timo's Page",
                  "line-color": "#009872",
                  "legend-item": {
                    "background-color": "#009872",
                    "borderRadius": 5,
                    "font-color": "white"
                  },
                  "legend-marker": {
                    "visible": false
                  },
                  "marker": {
                    "background-color": "#009872",
                    "border-width": 1,
                    "shadow": 0,
                    "border-color": "#69f2d0"
                  },
                  "highlight-marker": {
                    "size": 6,
                    "background-color": "#009872",
                  }
                },
                {
                  "values": data.slice(0, data.length-1).map(d => d['bradley_count']),
                  "text": "Bradley's Page",
                  "line-color": "#da534d",
                  "legend-item": {
                    "background-color": "#da534d",
                    "borderRadius": 5,
                    "font-color": "white"
                  },
                  "legend-marker": {
                    "visible": false
                  },
                  "marker": {
                    "background-color": "#da534d",
                    "border-width": 1,
                    "shadow": 0,
                    "border-color": "#faa39f"
                  },
                  "highlight-marker": {
                    "size": 6,
                    "background-color": "#da534d",
                  }
                }
              ]
            };
             
            zingchart.render({
              id: 'myChart',
              data: myConfig,
              height: '100%',
              width: '50%'
            });
          })
  .catch(error => {
              console.log("Error, data not sent:", error);
  });
}

console.log("About to fetch data from MongoDB for WEB TRAFFIC...")
fetchData();