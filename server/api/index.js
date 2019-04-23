const fs = require('fs');
const path = require('path');
const Airports = require('./airports.js');
const Flights = require('./flights.js');

export default app => {
  app.get('/api/airports:id', (req, res) => {
    const country = req.params.id.slice(1);
    if(!country.length) {
      res.send(JSON.stringify([]));
      return;
    }
    const reg = new RegExp('^' + country, 'i');
    const reg_code = new RegExp(country, 'i');
    let data = Airports.airports.filter(obj => {
      return ( reg.test(obj.name) || reg_code.test(obj.code) || reg_code.test(obj.country)) });
    
    if(!data.length) {
      const reg_middle = new RegExp( country, 'i');
      data = Airports.airports.filter(obj => {
        return ( reg_middle.test(obj.name) )});
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  });
    app.get('/api/flights/:searchby/:from/:to/:min_price/:max_price/:min_duration/:max_duration', (req, res) => {

    const searchby = req.params.searchby.slice(1);
    const from = req.params.from.slice(1);
    const to = req.params.to.slice(1);
    const min_duration_selected=req.params.min_duration.slice(1)
    const max_duration_selected=req.params.max_duration.slice(1)
    const min_price_selected=req.params.min_price.slice(1)
    const max_price_selected=req.params.max_price.slice(1)
    
    let min_price = 0;
    let max_price = 0;
    let max_duration = 0;
    let min_duration = 0;

    let arr = Flights.flights.map((item,index) =>{
      let item_aux = item;
      item_aux.depart_from = from;
      item_aux.depart_to = to;
      item_aux.return_from = to;
      item_aux.return_to = from;
      
      item_aux.total_time = parseInt(item.depart_duration) + parseInt(item.return_duration);
      item_aux.total_price = parseInt(item.depart_price) + parseInt(item.return_price);

      if (max_duration < item_aux.total_time) max_duration = item_aux.total_time;
      if (min_duration > item_aux.total_time || min_duration == 0) min_duration = item_aux.total_time;
      if (max_price < item_aux.total_price) max_price = item_aux.total_price;
      if (min_price > item_aux.total_price || min_price == 0) min_price = item_aux.total_price;

      let h = Math.floor(item_aux.depart_duration/60); //minutes;
      let m = item_aux.depart_duration % 60;
      item_aux.depart_format_time = h + "h " + m + "m"; 

      h = Math.floor(item_aux.return_duration/60); //minutes;
      m = item_aux.return_duration % 60;
      item_aux.return_format_time = h + "h " + m + "m"; 

      return item_aux;
    });


    let finalData = arr.filter((item) => {
        if (min_duration_selected > 0  && item.total_time < min_duration_selected) 
          {return false;}
        if (max_duration_selected > 0  && item.total_time > max_duration_selected) 
         {return false;}
        if (min_price_selected > 0 && item.total_price < min_price_selected) 
          {return false;}
        if (max_price_selected > 0 && item.total_price > max_price_selected) 
          {return false;}
        return true;
    });


    if (searchby !== "undefined" && searchby) {
      switch(searchby) {
        case "Cheapest first":
          finalData.sort((a,b) => ( parseInt(a.total_price) > parseInt(b.total_price)? 1 : -1  ) )
        break;
        case "Fastest first":
          finalData.sort((a,b) => (parseInt(a.total_time) > parseInt(b.total_time)? 1 : -1 ) )
        break;
        default:
          //No Sort alrithm. Default order
        break;
      }
    }

   setTimeout(function() {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({flights: finalData, max_duration, min_duration, max_price, min_price }));
    }, 3000);


  });


};
