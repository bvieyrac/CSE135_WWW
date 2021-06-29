async function fetchData(){ 
  var tempData;
  await fetch('https://www.cse135hw1.site/api/static',{
              method: 'GET',
              headers: {
                          'Content-Type': 'application/json'
              },
              // keepalive: true
  })
  .then(response => response.json())
  .then(sentData => {
            const jsonData = JSON.parse(sentData);
            console.log("*******BAR**********");
            console.log(jsonData);

            const user1H = jsonData[1].screenHeight;
            const user2H = jsonData[3].screenHeight;

            const user1W = jsonData[1].screenWidth;
            const user2W = jsonData[3].screenWidth;

            console.log(user1H);
            console.log(user2H);

            console.log(user1W);
            console.log(user2W);

            console.log("*******BAR**********");

            ZC.LICENSE = ["569d52cefae586f634c54f86dc99e6a9", "b55b025e438fa8a98e32482b5f768ff5"];
            var mybar = {
              "graphset": [{
                "type": "bar",
                "background-color": "white",
                "title": {
                  "text": "Tech Giant Quarterly Revenue",
                  "font-color": "#7E7E7E",
                  "backgroundColor": "none",
                  "font-size": "22px",
                  "alpha": 1,
                  "adjust-layout": true,
                },
                "plotarea": {
                  "margin": "dynamic"
                },
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
                "plot": {
                  "bars-space-left": 0.15,
                  "bars-space-right": 0.15,
                },
                "scale-y": {
                  "line-color": "#7E7E7E",
                  "item": {
                    "font-color": "#7e7e7e"
                  },
                  "values": "0:3000:10",
                  "guide": {
                    "visible": true
                  },
                  "label": {
                    "text": "Pixels",
                    "font-family": "arial",
                    "bold": true,
                    "font-size": "14px",
                    "font-color": "#7E7E7E",
                  },
                },
                "scaleX": {
                  "values": [
                    "Users screen height",
                    "Users screen width"
                  ],
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
                "tooltip": {
                  "visible": false
                },
                "crosshair-x": {
                  "line-width": "100%",
                  "alpha": 0.18,
                  "plot-label": {
                    "header-text": "%kv Sales"
                  }
                },
                "series": [{
                    "values": [
                      user1H,
                      user2H
                    ],
                    "alpha": 0.95,
                    "borderRadiusTopLeft": 7,
                    "background-color": "purple",
                    "text": "User1",
                  },
                  {
                    "values": [
                      user1W,
                      user2W
                    ],
                    "borderRadiusTopLeft": 7,
                    "alpha": 0.95,
                    "background-color": "orange",
                    "text": "User2"
                  }
                ]
              }]
            };
        
            zingchart.render({
              id: 'myBar',
              data: mybar,
              height: '50%',
              width: '50%'
            });
          })
  .catch(error => {
              console.log("Error, data not sent:", error);
  });
}

fetchData();


    