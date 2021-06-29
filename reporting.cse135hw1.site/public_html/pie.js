async function fetchData(){ 
  var tempData;
  await fetch('https://www.cse135hw1.site/api/performance',{
              method: 'GET',
              headers: {
                          'Content-Type': 'application/json'
              },
              // keepalive: true
  })
  .then(response => response.json())
  .then(sentData => {
            const jsonData = JSON.parse(sentData);
            console.log("*******PIE**********");
            console.log(jsonData);

            const load1 = jsonData[0].loadTime;
            const load2 = jsonData[1].loadTime;
            const load3 = jsonData[2].loadTime;
            const load4 = jsonData[3].loadTime;
            const load5 = jsonData[4].loadTime;

            console.log("*******PIE**********");

            var mypie = {
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
                // animation: {
                //   effect: 2,
                //   method: 5,
                //   speed: 900,
                //   sequence: 1,
                //   delay: 3000
                // }
              },
              source: {
                text: 'gs.statcounter.com',
                fontColor: "#8e99a9",
                fontFamily: "Open Sans"
              },
              title: {
                fontColor: "#8e99a9",
                text: 'User Load Time',
                align: "left",
                offsetX: 10,
                fontFamily: "Open Sans",
                fontSize: 25
              },
              plotarea: {
                margin: "20 0 0 0"
              },
              series: [{
                  values: [load1],
                  text: "User 1",
                  backgroundColor: '#50ADF5',
                },
                {
                  values: [load2],
                  text: "User 2",
                  backgroundColor: '#FF7965',
                  detached: true
                },
                {
                  values: [load3],
                  text: 'User 3',
                  backgroundColor: '#FFCB45',
                  detached: true
                },
                {
                  text: 'User 4',
                  values: [load4],
                  backgroundColor: '#6877e5'
                },
                {
                  text: 'User 5',
                  values: [load5],
                  backgroundColor: '#6FB07F'
                }
              ]
            };
             
            zingchart.render({
              id: 'myPie',
              data: mypie,
              height: '70%',
              width: '70%'
            });
  })
  .catch(error => {
              console.log("Error, data not sent:", error);
  });
}

fetchData();