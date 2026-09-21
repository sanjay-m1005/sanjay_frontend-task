// 4. Create an array of student objects containing name and mark. Use a for loop to print the names of students who scored more than 80.
function student(num) {
    for(i=0;i<num.length;i++){
        if(num[i].mark>80){
            console.log(num[i].name);
            
    }
    
}
}
student([
    {name:"sanjay", mark:99},
    {name:"raj",mark:78},
    {name:"naresh",mark:77}
])
