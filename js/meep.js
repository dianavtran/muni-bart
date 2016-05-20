var fetch = function() {
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
  setInterval(fetch, 60000);
  $('p').empty();
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
  clearInterval(fetch);
  fetch = null;

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
  var bartValues = bartArr.slice(0,6).sort(function(a, b){return a-b});
  $("#bart").html("<p>"+ bartValues +"</p>");
  clearInterval(fetch);
  fetch = null;
}
