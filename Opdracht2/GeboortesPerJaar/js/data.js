//csv inlezen en data laden
d3.csv("GeboortesPerJaar.csv")
  .row(function(d){ return {year: Number(d.jaar), amount:Number(d.aantal)}; })
  .get(function(error, data){

      //hoogte en breedte instellen
      var height = 300;
      var width = 500;

      //kijken wat de maximale waarde is
      var max = d3.max(function(d){ return d.amount; });
      //oudste en jongste jaartal
      var minDate = d3.min(function(d){ return d.year; });
      var maxDate = d3.max(function(d){ return d.year; });

      //beiden axissen declareren en een plek geven
      var y = d3.scaleLinear()
                  .domain([0,max])
                  .range([height,0]);
      var x = d3.scaleLinear()
                .domain([minDate, maxDate])
                .range([0, width]);
      var yAxis = d3.axisLeft(y);
      var xAxis = d3.axisBottom(x);

      //margin aanmaken
      var margin = {top: 20, right: 20, left: 20, bottom: 10};

      //svg toevoegen aan <body>
      var svg = d3.select("body").append("svg")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                  .attr("transform", "translate(" +margin.left+ "," +margin.top+ ")");

      //bar chart aanmaken (rectangles toevoegen)
      svg.selectAll(".bar").data(data)
                            .enter().append("rect")
                            .attr("class", "bar")
                            .attr("x", function(d){ return x(d.year); })
                            //.attr("width", x.bandwidth())
                            .attr("y", function(d){ return y(d.amount); })
                            .attr("height", function(d){ return height - y(d.amount); })

      //x axis
      svg.append("g").attr("class","x axis").attr("transform","translate(0,"+height+")").call(xAxis);
      //y axis
      svg.append("g").attr("class", "y axis").call(yAxis);

  })
