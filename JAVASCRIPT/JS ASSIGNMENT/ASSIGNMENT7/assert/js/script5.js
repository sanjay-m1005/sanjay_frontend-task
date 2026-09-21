let employe=[
    {name:"sanjy",salary:35000},
    {name:"raj",salary:30000},
    {name:"naresh",salary:50000}
]
let greater=40000
for(let key in employe){
    if(employe[key].salary > greater){
        console.log("name",employe[key].name);
        console.log("salary",employe[key].salary);
        
        

    }
}