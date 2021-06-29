async function fetchData(){ 
    var tempData;
    await fetch('https://www.cse135hw1.site/api/activity/1621223652024',{
                method: 'GET',
                headers: {
                            'Content-Type': 'application/json'
                },
                // keepalive: true
    })
    .then(response => response.json())
    .then(sentData => {
              const jsonData = JSON.parse(sentData);
              console.log(jsonData);

              const scrollXData = jsonData.cursorPos.map((coords) =>{
                return coords[0];
              });
              
              const scrollYData = jsonData.cursorPos.map((coords) =>{
                return coords[1];
              });

              const allkeys = jsonData.keynums;

              console.log(scrollXData);
              console.log(scrollYData);
              console.log(allkeys);

              ZC.LICENSE = ["569d52cefae586f634c54f86dc99e6a9", "b55b025e438fa8a98e32482b5f768ff5"];
              var myline = {
                "type": "line",
                "utc": true,
                "title": {
                  "text": "Webpage Analytics",
                  "font-size": "24px",
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
                "scale-x": {
                  "min-value": 1383292800000,
                  "shadow": 0,
                  "step": 3600000,
                  "transform": {
                    "type": "date",
                    "all": "%D, %d %M<br />%h:%i %A",
                    "guide": {
                      "visible": false
                    },
                    "item": {
                      "visible": false
                    }
                  },
                  "label": {
                    "visible": false
                  },
                  "minor-ticks": 0
                },
                "scale-y": {
                  "line-color": "#f6f7f8",
                  "shadow": 0,
                  "guide": {
                    "line-style": "dashed"
                  },
                  "label": {
                    "text": "Page Views",
                  },
                  "minor-ticks": 0,
                  "thousands-separator": ","
                },
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
                  // "animation": {
                  //   "effect": 1,
                  //   "sequence": 2,
                  //   "speed": 100,
                  // }
                },
                "series": [
                  {
                    "values": scrollXData,
                    "text": "Scroll X Coordinates",
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
                    "values": scrollYData,
                    "text": "Scroll Y Coordinates",
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
                    "values": allkeys,
                    "text": "Keys Pressed",
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
                id: 'myLine',
                data: myline,
                height: '100%',
                width: '100%'
              });
              return tempData;
    })
    .catch(error => {
                console.log("Error, data not sent:", error);
    });
} 

const activityData = fetchData();
console.log(activityData);

