let student=[
    {name:"sanjay", mark:99},
    {name:"raj",mark:88},
    {name:"mark",mark:77}

]

let target="raj"
for(let key in student){
    if(student[key].name===target){
        console.log("name",student[key].name);
        console.log("mark",student[key].mark);
    }
}