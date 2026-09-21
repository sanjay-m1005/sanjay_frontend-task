// Create an array of numbers. Use a for loop to find and print only the even numbers.
function arr(num){
    for(i=0;i<num.length;i++){
        if(num[i]%2===0){
            console.log(num[i]);
        }
    }
    
}
arr([1,2,3,4,5,6,7,8,9,10])
