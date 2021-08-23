var puller;
var active;

//writes object array to screen
function write1(given){
  let writer = '';

  given.forEach(value => {
    writer += "<a target = '_blank' href = " + value.link + ">" + value.name + ":</a>" + ' ' + value.tags + "<br>";
  });

  document.getElementById("listing").innerHTML = writer;
  document.getElementsByName("tag")[0].placeholder= given.length + " entries matching search";
  document.getElementsByName("tag")[0].value="";
};

//fetches json file, hands data to var puller, and writes listing to screen 
//this thing is a massive pain in the rear to work with, good luck to any who try
fetch("./library.json")
  .then(
    function(response) {
      response.json().then((data) => { 
          puller = data;
          write1(puller);
          active = puller;
      });
    }
  );
//ocd

//flips order of listing and writes to screen
document.getElementById("flip").addEventListener("click", function(){
  let t = []
  for(let i = active.length; i != 0; i--){
    t.push(active[i-1])
  };
  active = t;
  write1(active);
});

//handles searches
document.getElementById("search").addEventListener("click", function(){
  let given = document.getElementById('tag').value.toLowerCase();
  let giver = [];
  if(given != ""){
    active.forEach(value =>{
      let worker = value.tags;
      let title = value.name;
      let stat =0;  

      //searches for matching title
      if(title.toLowerCase().indexOf(given) > -1){ 
        stat++; 
      }
      
      //searches for matching tags
      worker.forEach(value =>{
        let compare = value.toLowerCase();
        if ( compare.indexOf(given) > -1 ) {
          stat++;
        } 
      });
      if(stat > 0){
        giver.push(value)
      };
    });

    if(giver.length != 0){
      active = giver
      write1(active);
    }
  };
});

//groups button
document.getElementById("group").addEventListener("click",function(){
  document.getElementById("group").style.visibility = "hidden"
  let t = []
  for(let i = active.length; i != 0; i--){
    t.push(active[i-1])
  };

  let groups = {}
  t.forEach(value => {
    if(value.hasOwnProperty('group')){
      if(groups.hasOwnProperty(value.group)){
        let inter = value.group;
        groups[inter].push(value);
      }else{
        let inter = value.group;
        groups[inter] = [value];
      }
    }
  });
  
  let writer = '';
  for (let p in groups){
    writer += p.toString()+"<br>";
    groups[p].forEach(value => {
    writer += "<a target = '_blank' href = " + value.link + ">" + value.name + ":</a>" + ' ' + value.tags + "<br>";
    });
    writer += "<br>"
  }

  document.getElementById("listing").innerHTML = writer;
  
});

//catches and redirects enter key actions 
document.getElementById('tag').addEventListener("keypress",function(event){
  if (event.keyCode === 13){
    if(document.getElementById('tag').value == ''){
      document.getElementById("reset").click();
    }else{
      document.getElementById("search").click();
    }
  }
});

//resets listing to original
document.getElementById("reset").addEventListener("click", function(){
  document.getElementById("group").style.visibility = "visible";
  active = puller;
  write1(active);
});                                               
