import axios from "axios";
import { NextResponse } from "next/server";


export async function GET(req: Request) {

    try {
        const res = await axios.get("http://127.0.0.1:8000/");
        console.log("Geter| " + res.data);


        return NextResponse.json(res.data);

    } catch (error) {
        return NextResponse.json("FastApi GET ERR + " + error);
    }

}


export async function POST(req: Request) {

    try {
        // const data = await req.json();
        // const userId = data.userId;
        // const name = data.name
        // const address = data.address


        const res = await axios.post("http://127.0.0.1:8000/items/", {
            name: 'zzzzzz',
            description: 'vvvvvvv'
        });
        console.log("Poster| " + res.data);


        return NextResponse.json(res.data);

    } catch (error) {
        return NextResponse.json("FastApi GET ERR + " + error);
    }

}