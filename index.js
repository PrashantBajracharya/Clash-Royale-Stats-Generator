import express from "express";
import axios from 'axios';
import bodyParser from "body-parser";

const app = express();
const port = 80;
const apiURL = "https://api.clashroyale.com/v1/players/%23";
const apiToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjBjYzZlMzYxLWQwYzctNDRhNi04MDA1LTZhZjcyZmQyZTI2YiIsImlhdCI6MTcwMzA1MjkwNSwic3ViIjoiZGV2ZWxvcGVyL2JiMGE4NTY2LTdiOTQtZGNkYy0zOTQ5LTU0MDgxNjAzZjcxMSIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIzNC4yMzYuMTMyLjEyNCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.v6W8zKNjS2eL6X517PWWfiKF32zRq80t3sEiMdFqhRUOcUZE-j2oXv0D4545hIcb1epQv9IzIYeVoyFHY9vGpQ";
app.use(express.static("Public"));

app.set('views', './Views');
app.set('view engine', 'ejs');

//To pass form data to index.ejs, bodyparser middleware is used.
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get("/", async(req, res)=> {
    res.render("index");
});

app.post("/generate", async(req, res) => {
    const playerTag = req.body.playerTag.toUpperCase();
    try {
        const player = await axios.get(`${apiURL}${playerTag}`, {
            headers: 
                {
                    Authorization: `Bearer ${apiToken}`
                }
        }); 

        const chest = await axios.get(`${apiURL}${playerTag}/upcomingchests`, {
            headers: 
                {
                    Authorization: `Bearer ${apiToken}`
                }
        }); 

        console.log(player.data, chest.data);
        res.render("index", 
        {          
            playerStats:player.data,
            playerChest:chest.data
          });
      } 
      
      catch (error) {
        console.log(error.response.data);
        res.render("index", 
          {
            playerTag:playerTag
          });
      }
});
