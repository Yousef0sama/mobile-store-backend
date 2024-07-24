// imports

import axios from "axios";

// db

import { createConnection } from "../../../config/db/Conn";

// functions

import checkInputs, { checkType, isEmpty } from "../../../functions/check_inputs/check_inputs";
import encodeJWT from "../../../functions/jwt/encode/encode";

// interfaces

import { Request, Response } from "express";

export default async function updateAddress (req : Request & {user? : any}, res: Response) {

  try {

    // get user id
    // it's added in req.user in verifyJWT middle ware

    let userId = req.user;

    if (!userId) {
      res.status(401).json( {massage : "unauthorized please login or sign up"} );
      return;
    }


    const {id, country = "", state = "", city = "", street = "", otherStreet, zip} = req.body;

    // check inputs

    if (checkInputs(id, "number", "id")) {
      res.status(400).json({ message : checkInputs(id, "number", "id") });
      return;
    }

    if (!isEmpty(country)) {

      if (!checkType(country, "string")) {
        res.status(400).json({ message : "country must be string" })
        return;
      }

    }

    if (!isEmpty(state)) {

      if (!checkType(state, "string")) {
        res.status(400).json({ message : "state must be string" })
        return;
      }

    }

    if (!isEmpty(city)) {

      if (!checkType(city, "string")) {
        res.status(400).json({ message : "city must be string" })
        return;
      }

    }

    if (!isEmpty(street)) {

      if (!checkType(street, "string")) {
        res.status(400).json({ message : "street must be string" })
        return;
      }

    }

    if (!isEmpty(otherStreet)) {

      if (!checkType(otherStreet, "string")) {
        res.status(400).json({ message : "other street must be string" })
        return;
      }

    }

    if (!isEmpty(zip)) {

      if (!checkType(zip, "number")) {
        res.status(400).json({ message : "zip must be number" })
        return;
      }

    }

    let isAddressIdExist = false;

    const host = `${req.protocol}://${req.get('host')}`

    await axios.get(`${host}/addressForBackend/id/${id}`, {
      headers : {
        Authorization : `Bearer ${encodeJWT({}, process.env.BACKEND_KEY!, 5)}`
      }
    }).then( (response) => {

      const result = response.data;

      isAddressIdExist = result.length > 0

    }).catch( (err) => {
      console.log(err)
      res.status(500).json({ message : err.message });
    })

    if (!isAddressIdExist) {
      res.status(400).json({ message : "address id not found" })
    }

    let sqlInputs : string = ``

    // if country add country

    sqlInputs += `${country ? `country =  '${country}'` : ""}`;

    // if state add state

    sqlInputs += `${state ? `${sqlInputs.length > 0 ? "," : ""} state =  '${state}'` : ""}`;

    // if city add city

    sqlInputs += `${city ? `${sqlInputs.length > 0 ? "," : ""} city =  '${city}'` : ""}`;

    // if street add street

    sqlInputs += `${street ? `${sqlInputs.length > 0 ? "," : ""} street =  '${street}'` : ""}`;

    // if otherStreet add otherStreet

    sqlInputs += `${otherStreet ? `${sqlInputs.length > 0 ? "," : ""} otherStreet =  '${otherStreet}'` : ""}`;

    // if zip add zip

    sqlInputs += `${zip ? `${sqlInputs.length > 0 ? "," : ""} zip =  '${zip}'` : ""}`

    if (sqlInputs.length === 0) {

      res.status(204).json({ message : "no data to update" });
      return

    }

    let connection = createConnection();

    connection.connect();

    connection.query(`UPDATE addresses SET ${sqlInputs} WHERE address_id = ${id}`, (err) => {

      connection.end();

      if (err) {
        res.status(500).json(err);
      }

      res.status(200).json({ message : "data updated!" });

    })

  } catch (err : any) {

    res.status(400).json({ message : err.message })

  }

}