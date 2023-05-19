const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F", "G", "H", "I","J"];


setInterval(() => {
  
      
  let transNo = "order";
  for (let i = 0; i < 10; i++) {
    transNo += hex[getRandomNumber()];
  }
  // console.log(transNo);



  function getRandomNumber() {
      return Math.floor(Math.random() * hex.length);
    }
    
    console.log(transNo) 
    
}, 1000);
