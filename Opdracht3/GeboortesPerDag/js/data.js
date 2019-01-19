//functie om een datum in csv te kunnen lezen en weergeven (US date)
var parseDate = d3.timeParse("%m/%d/%Y");

//csv bestand inlezen en de data uit elke lijn halen
d3.csv("geboortes2017.csv")
    .row(function(d){ return {day: parseDate(d.dag), amount:Number(d.aantal)}; })
    .get(function(error,data){

      var height = 100;
      var width = 1000;

      //kijken wat de maximale waarde is
      var max = d3.max(data,function(d){ return d.amount; });
      //Oudste en nieuwste datum
      var minDate = d3.min(data,function(d){ return d.day; });
      var maxDate = d3.max(data,function(d){ return d.day; });

      //Beiden axissen declareren en plek geven
      var y = d3.scaleLinear()
                  .domain([0,max])
                  .range([height,0]);
      var x = d3.scaleTime()
                  .domain([minDate,maxDate])
                  .range([0,width]);
      var yAxis = d3.axisLeft(y);
      var xAxis = d3.axisBottom(x);

      //svg toevoegen aan <body> zodat de grafiek getekend kan worden
      var svg = d3.select("body").append("svg").attr("height","100%").attr("width","100%");

      //alle margins toewijzen
      var margin = {left:50,right:50,top:40,bottom:0};

      //een groep toevoegen aan svg om het te kunnen manipuleren
      var chartGroup = svg.append("g").attr("transform","translate("+margin.left+","+margin.top+")");

      //line generator en de waardes meegeven om de lijn te genereren
      var line = d3.line()
                      .x(function(d){ return x(d.day); })
                      .y(function(d){ return y(d.amount); });

      chartGroup.append("path").attr("d",line(data));
      chartGroup.append("g").attr("class","x axis").attr("transform","translate(0,"+height+")").call(xAxis);
      chartGroup.append("g").attr("class","y axis").call(yAxis);


})
