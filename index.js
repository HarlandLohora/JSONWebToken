const express = require('express');
const jwt     = require('jsonwebtoken');
const app     = express();

app.get('/', ( req, res ) => {
  res.json({
    element: 'API works'
  });
})

app.post('/api/login', ( req, res ) => {
  const user = { id : 3 }
  const token = jwt.sign({user}, 'my_secret_key');
  res.json({
    token
  })
})

app.get('/api/protected', ensureToken ,( req, res ) => {
  jwt.verify( req.token, 'my_secret_key', ( err,data ) => {
    if ( err ){
      res.sendStatus(403);
    }else{
      res.json({
        page: 'API Protected',
        data
      })
    }
  })
})

function ensureToken( req, res, next ){
  const bearerHeader = req.headers['autorization'];
  if(typeof(bearerHeader) !== 'undefined'){
    const bearer      = bearerHeader.split(' ');
    const bearerToken = bearer[1];

    req.token = bearerToken;
    next();
  }else{
    res.sendStatus(403);
  }
}

app.listen( 3000 , () => {
  console.log('Server on port 3000');
})
