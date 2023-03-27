const connectToMongo=require('./db.js');
const express = require('express')
var cors = require('cors')
const port = 5000

connectToMongo;

const app = express()
app.use(cors())

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Success is not greate without failure!')
})

app.use("/api/auth/student", require('./routes/authStudent'))
app.use("/api/auth/org", require('./routes/authOrg'))
app.use("/api/Orgevent", require('./routes/EventOrg'))
app.use("/api/Studentevent", require('./routes/Eventstudent'))


app.listen(port, () => {
  console.log(`CollegeFun listening on port ${port}`)
})