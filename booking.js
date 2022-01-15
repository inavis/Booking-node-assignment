const express = require("express");

const app = express();
const PORT =9000;

//middleware
app.use(express.json())

const rooms=[
    {
        number:101,
        capacity:3,
        amenities:["wifi","tv","kettle","mini-fridge","hotwater"],
        price_per_hour_inRs:600,
        booked_status:true
    },
    {
        number:105,
        capacity:2,
        amenities:["wifi","tv","kettle","mini-fridge","hotwater","sea-view"],
        price_per_hour_inRs:700,
        booked_status:true
    },
    {
        number:104,
        capacity:4,
        amenities:["wifi","tv","hotwater"],
        price_per_hour_inRs:500,
        booked_status:false
    },
    {
        number:103,
        capacity:2,
        amenities:["hotwater"],
        price_per_hour_inRs:300,
        booked_status:false
    },
    // {
    //     number:102,
    //     capacity:3,
    //     amenities:["wifi","tv","kettle","hotwater"],
    //     price_per_hour_inRs:600,
    //     booked_status:true
    // }
];

const bookings=[
    {
        customer_name:"Ash",
        date:"10-1-2022",
        start_time:"2pm",
        end_time:"11pm",
        room_number:101
    },
    {
        customer_name:"Ben",
        date:"11-01-2022",
        start_time:"8am",
        end_time:"6pm",
        room_number:105
    },
    // {
    //     customer_name:"Chris",
    //     date:"11-01-2022",
    //     start_time:"1pm",
    //     end_time:"4.30pm",
    //     room_number:102
    // }
]


//send details of rooms from both data
app.get("/rooms",(request,response)=>{
    let arr=[];
    rooms.map((ele)=>{
       // console.log(bookings.find(({room_number})=>room_number===ele.number))
        const obj = bookings.find(({room_number})=>room_number===ele.number);
        if(obj!==undefined){
            arr.push({
                room_number:ele.number,
                status:ele.booked_status,
                customer_name:obj.customer_name,
                date:obj.date,
                start_time:obj.start_time,
                end_time:obj.end_time
            })
        }else{
            arr.push({
                room_number:ele.number,
                status:ele.booked_status,
                customer_name:"-",
                date:"-",
                start_time:"-",
                end_time:"-"
            })
        }
    })
    response.send(arr);
})

//send bookings data
app.get("/customers",(request,response)=>{
    response.send(bookings);
})


//use middleware to get data from request
app.post("/booking",(request,response)=>{
    const newbooking = request.body;
    console.log(newbooking)
    bookings.push(request.body)
    response.send(request.body)
})
app.post("/room",(request,response)=>{
    const newroom = request.body;
    console.log(newroom)
    rooms.push(request.body)
    response.send(request.body)
})

app.listen(PORT,()=>console.log("Server started in PORT "+PORT))