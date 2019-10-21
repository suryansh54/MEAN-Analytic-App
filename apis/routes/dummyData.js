const router = require('express').Router();

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDataArray(dataCount = 100){
    var dataPoints = [];
    for(var i=0; i < dataCount; i++){
        dataPoints.push(
            {
                x: random(0, 200), y: random(1, 7), z: random(200, 1200) , name: "XYZ "+i
            }
        )
    }
    return dataPoints;
}

router.get('/chart-two-data', (req, res) => {
    res.json({
        data: {
            title: "Chart 2",
            dataPoints: randomDataArray(50)
        }
    });
});


router.post('/chart-three-data', (req, res) => {
    let dataCount = req.body.dataCount || 1000;
    var dataPoints;
    if(req.body.x){
        dataPoints = randomDataArray(dataCount).filter((v)=>{
            return v.x > req.body.x
        });
    } else {
        dataPoints = randomDataArray(dataCount);
    }
    res.json({
        data: {
            title: "Chart 3",
            dataPoints: dataPoints
        }
    });
});
module.exports = router;