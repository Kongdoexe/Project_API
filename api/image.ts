import mysql from 'mysql';
import express from "express";
import { connect, queryAsync } from "../dbconnect";

export const router = express.Router();

router.get("/:uid", async (req, res) => {
    const uid = req.params.uid

    let sql = `SELECT users.userid as id, users.image, users.username, images.name, images.imageID, images.score, images.image 
                FROM images, users WHERE images.userid = users.userid AND images.userid = ${uid}`;
    const result = await queryAsync(sql) as any[];

    if (result.length > 0) {
        const userData = result[0];
        const imageData = result.map(item => ({
            name: item.name,
            imageID: item.imageID,
            score: item.score,
            image: item.image
        }));

        const formatData = {
            userID: userData.id,
            username: userData.username,
            imageUser: userData.image,
            images: imageData
        };

        console.log(formatData);
        res.status(200).json(formatData)
    } else {
        console.log('No data found.');
        res.status(400).json({ error: "Error no Result" })
    }
})

router.get("/Graph/:uid", async (req, res) => {
    const uid = req.params.uid

    let sql = `SELECT vote.winnerID, vote.scoreWinner, DATE_FORMAT(vote.votedate, '%Y-%m-%d %H:%i:%s') AS date, winner_image.score AS Origin_Score, winner_image.image AS url
                FROM vote
                JOIN images AS winner_image ON vote.winnerID = winner_image.imageID
                WHERE winner_image.userid = ${uid}
                AND vote.votedate IN ( SELECT MAX(votedate)
                        FROM vote AS v
                        WHERE DATE(v.votedate) >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
                        AND DATE(v.votedate) < DATE_SUB(CURDATE(), INTERVAL 1 DAY) -- Added missing 'AND'
                        GROUP BY DATE(v.votedate))
                ORDER BY vote.winnerID DESC`;

    try {
        const result = await queryAsync(sql);
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json(error)
    }
})