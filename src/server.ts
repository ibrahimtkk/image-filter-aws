import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  app.use(bodyParser.json());

  app.get('/filteredimage/', async (req, res) => {
    const url = req.query;
    console.log("url: ", url)
    filterImageFromURL(url.image_url)
      .then(aaa => {
        return res.sendFile(aaa, error => {
          deleteLocalFiles([aaa])
        })
      });
      
  })

  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();