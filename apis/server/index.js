const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

app.get('/', (req, res)=>{
    res.json(
        {
            name:'Suryansh'
        }
    );
})
app.listen(port, ()=> console.log(`Server is running in port ${port}`));