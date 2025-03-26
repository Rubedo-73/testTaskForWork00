import { request, response } from "express";
import { User } from "../../db/models/index.js"

/**
 * @param {request} req 
 * @param {response} res
 */
async function balance (req, res) {
    let id = req?.body?.userId;
    let balanceChangeValue = req?.body?.amount;

    if ( !(id && balanceChangeValue) )
        res.status(400).send("400 Bad Request\nRequired fields userId and amount")

    const user = await User.findOne({ id })

    user.balance += balanceChangeValue

    if (user.balance >= 0) {
        await user.save()
        res.status(200).send("Ok")
    } else {
        res.status(400).send("400 Bad Request\nInsufficient funds.")
    }
}

export default balance