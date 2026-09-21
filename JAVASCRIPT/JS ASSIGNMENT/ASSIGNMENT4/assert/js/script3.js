// TASK 3 – MARK GRADE
// Create:
// let mark = 85;
// Display:
// 90–100 → A+
// 75–89 → A
// 50–74 → B
// 35–49 → C
// Below 35 → Fail
// Use if...else if...else

    let mark=20;

     if(mark>=35 && mark<=49){
        console.log("c");
        
    }
    else if(mark>=50 && mark<=74){
        console.log("b");
        
    }
    else if(mark>=75 && mark<=89 ){
        console.log("A")
    }
    else if(mark>=90 && mark<=100){
        console.log("a+")
    }
    else{
        console.log("fail");
        
    }