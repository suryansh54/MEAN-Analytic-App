const router = require('express').Router();

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDataArray(dataCount = 100){
    var dataPoints = [];
    for(var i=0; i < dataCount; i++){
        dataPoints.push(
            {
                x: random(30, 80), y: random(1, 7), z: random(200, 1200) , name: "XYZ"
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


router.get('/chart-three-data', (req, res) => {
    res.json({
        data: {
            title: "Chart 3",
            dataPoints: randomDataArray(1000)
        }
    });
});
module.exports = router;