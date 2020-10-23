/**
 * ---------------------------------------
 * This demo was created using amCharts 4.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------
 */

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

var chart = am4core.create("chartdiv", am4plugins_forceDirected.ForceDirectedTree);
chart.legend = new am4charts.Legend();

var networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries())

networkSeries.data = [{
  name: 'Wednesday',
  children: [{
    name: 'Berry',
    children: [{
      name: 'Blackberry', value: 1
    }, {
      name: 'Raspberry', value: 1
    }, {
      name: 'Blueberry', value: 1
    }, {
      name: 'Strawberry', value: 1
    }]
  }, {
    name: 'Wednesday',
    children: [{
      name: 'Raisin', value: 1
    }, {
      name: 'Prune', value: 1
    }]
  }, {
    name: 'Other Fruit',
    children: [{
      name: 'Coconut', value: 1
    }, {
      name: 'Cherry', value: 1
    }, {
      name: 'Pomegranate', value: 1
    }, {
      name: 'Pineapple', value: 1
    }, {
      name: 'Grape', value: 1
    }, {
      name: 'Apple', value: 1
    }, {
      name: 'Peach', value: 1
    }, {
      name: 'Pear', value: 1
    }]
  }, {
    name: 'Citrus Fruit',
    children: [{
      name: 'Grapefruit', value: 1
    }, {
      name: 'Orange', value: 1
    }, {
      name: 'Lemon', value: 1
    }, {
      name: 'Lime', value: 1
    }]
  }]
}, {
  name: 'Thursday',
  children: [{
    name: 'Berry',
    children: [{
      name: 'Blackberry', value: 1
    }, {
      name: 'Raspberry', value: 1
    }, {
      name: 'Blueberry', value: 1
    }, {
      name: 'Strawberry', value: 1
    }]
  }, {
    name: 'Wednesday',
    children: [{
      name: 'Raisin', value: 1
    }, {
      name: 'Prune', value: 1
    }]
  }, {
    name: 'Other Fruit',
    children: [{
      name: 'Coconut', value: 1
    }, {
      name: 'Cherry', value: 1
    }, {
      name: 'Pomegranate', value: 1
    }, {
      name: 'Pineapple', value: 1
    }, {
      name: 'Grape', value: 1
    }, {
      name: 'Apple', value: 1
    }, {
      name: 'Peach', value: 1
    }, {
      name: 'Pear', value: 1
    }]
  }, {
    name: 'Citrus Fruit',
    children: [{
      name: 'Grapefruit', value: 1
    }, {
      name: 'Orange', value: 1
    }, {
      name: 'Lemon', value: 1
    }, {
      name: 'Lime', value: 1
    }]
  }]
},{
  name: 'Friday',
  children: [{
    name: 'Berry',
    children: [{
      name: 'Blackberry', value: 1
    }, {
      name: 'Raspberry', value: 1
    }, {
      name: 'Blueberry', value: 1
    }, {
      name: 'Strawberry', value: 1
    }]
  }, {
    name: 'Wednesday',
    children: [{
      name: 'Raisin', value: 1
    }, {
      name: 'Prune', value: 1
    }]
  }, {
    name: 'Other Fruit',
    children: [{
      name: 'Coconut', value: 1
    }, {
      name: 'Cherry', value: 1
    }, {
      name: 'Pomegranate', value: 1
    }, {
      name: 'Pineapple', value: 1
    }, {
      name: 'Grape', value: 1
    }, {
      name: 'Apple', value: 1
    }, {
      name: 'Peach', value: 1
    }, {
      name: 'Pear', value: 1
    }]
  }, {
    name: 'Citrus Fruit',
    children: [{
      name: 'Grapefruit', value: 1
    }, {
      name: 'Orange', value: 1
    }, {
      name: 'Lemon', value: 1
    }, {
      name: 'Lime', value: 1
    }]
  }]
},{
  name: 'Monday',
  children: [{
    name: 'Berry',
    children: [{
      name: 'Blackberry', value: 1
    }, {
      name: 'Raspberry', value: 1
    }, {
      name: 'Blueberry', value: 1
    }, {
      name: 'Strawberry', value: 1
    }]
  }, {
    name: 'Wednesday',
    children: [{
      name: 'Raisin', value: 1
    }, {
      name: 'Prune', value: 1
    }]
  }, {
    name: 'Other Fruit',
    children: [{
      name: 'Coconut', value: 1
    }, {
      name: 'Cherry', value: 1
    }, {
      name: 'Pomegranate', value: 1
    }, {
      name: 'Pineapple', value: 1
    }, {
      name: 'Grape', value: 1
    }, {
      name: 'Apple', value: 1
    }, {
      name: 'Peach', value: 1
    }, {
      name: 'Pear', value: 1
    }]
  }, {
    name: 'Citrus Fruit',
    children: [{
      name: 'Grapefruit', value: 1
    }, {
      name: 'Orange', value: 1
    }, {
      name: 'Lemon', value: 1
    }, {
      name: 'Lime', value: 1
    }]
  }]
},{
  name: 'Tuesday',
  children: [{
    name: 'Berry',
    children: [{
      name: 'Blackberry', value: 1
    }, {
      name: 'Raspberry', value: 1
    }, {
      name: 'Blueberry', value: 1
    }, {
      name: 'Strawberry', value: 1
    }]
  }, {
    name: 'Wednesday',
    children: [{
      name: 'Raisin', value: 1
    }, {
      name: 'Prune', value: 1
    }]
  }, {
    name: 'Other Fruit',
    children: [{
      name: 'Coconut', value: 1
    }, {
      name: 'Cherry', value: 1
    }, {
      name: 'Pomegranate', value: 1
    }, {
      name: 'Pineapple', value: 1
    }, {
      name: 'Grape', value: 1
    }, {
      name: 'Apple', value: 1
    }, {
      name: 'Peach', value: 1
    }, {
      name: 'Pear', value: 1
    }]
  }, {
    name: 'Citrus Fruit',
    children: [{
      name: 'Grapefruit', value: 1
    }, {
      name: 'Orange', value: 1
    }, {
      name: 'Lemon', value: 1
    }, {
      name: 'Lime', value: 1
    }]
  }]
}];

networkSeries.dataFields.linkWith = "linkWith";
networkSeries.dataFields.name = "name";
networkSeries.dataFields.id = "name";
networkSeries.dataFields.value = "value";
networkSeries.dataFields.children = "children";

networkSeries.nodes.template.tooltipText = "{name}";
networkSeries.nodes.template.fillOpacity = 1;

networkSeries.nodes.template.label.text = "{name}"
networkSeries.fontSize = 8;
networkSeries.maxLevels = 2;
networkSeries.maxRadius = am4core.percent(6);
networkSeries.manyBodyStrength = -16;
networkSeries.nodes.template.label.hideOversized = true;
networkSeries.nodes.template.label.truncate = true;