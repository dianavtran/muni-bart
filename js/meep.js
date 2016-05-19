function fetch()
{
  $.ajax({
    type: "GET",
    url: "http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=sf-muni&r=J&stopId=13996",
    dataType: "xml",
    success: parseXml
  });
  $.ajax({
    type: "GET",
    url: "http://api.bart.gov/api/etd.aspx?cmd=etd&orig=24th&key=MW9S-E7SL-26DU-VV8V",
    dataType: "xml",
    success: parseXmlBart
  });
  $('p').empty();
  setInterval(fetch, 60000);
}

$(document).ready(function() {
  fetch();
});

function parseXml(xml)
{
  var muniArr = [];
  $(xml).find("prediction").each(function()
  {
    muniArr.push($(this).attr('minutes'));
  });
  $("#j").html("<p>"+ muniArr.sort(function(a, b){return a-b})+"</p>");
}

function parseXmlBart(xml)
{
  var bartArr = [];
  $(xml).find("estimate").each(function()
  {
    if ($(this).find("direction").text() == "North") {
      if ($(this).siblings().find('minutes').html() != "Leaving" && $(this).siblings().find('minutes').html() > 5) {
    bartArr.push($(this).siblings().find('minutes').html());
      }
    }
  });
  $("#bart").html("<p>"+ bartArr.sort(function(a, b){return a-b}) +"</p>");
}


// function reload(){
//       var container1 = document.getElementById("j");
//       var container2 = document.getElementById("bart");
//       var content1 = container1.innerHTML;
//       container1.innerHTML= content1;
//       var content2 = container2.innerHTML;
//       container2.innerHTML= content2;
//       console.log('yay');
// }
