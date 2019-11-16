function buildMetadata(sample) {
	
	d3.json(`metadata/${sample}`).then(function(data) {
		
		var meta = d3.select('#sample-metadata');
		meta.html("");

		Object.entries(data).forEach(([key, value]) => {
			meta.append('p')
			.text(`${key} : ${value}`);
		});
	});
}

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`

    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);


function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots

	d3.json(`samples/${sample}`).then(function(data) {
		var data = [
		{values: data.sample_values.slice(0,10),
		labels: data.otu_ids.slice(0,10),
		hovertext: data.otu_labels,
		type: "pie"}];

		var layout = { 
			margin: { t: 30, b: 100 },
			title: "Sample %"
			};
		Plotly.plot("pie", data, layout);
	}),

	// @TODO: Build a Bubble Chart using the sample data
	
	d3.json(`samples/${sample}`).then(function(data2) {
		var data2 = [{
			x: data2.otu_ids,
			y: data2.sample_values,
			text: data2.otu_labels,
			type: 'bubble',
			mode: 'markers',
			marker: {
			color: data2.otu_ids,
			size: data2.sample_values
			}
		}];
		
		
		var layout = {
			title: 'Samples by OTU IDs',
			xaxis: {
				title: {
				  text: 'OTU ID',
				}
			},
			yaxis: {
				title: {
				  text: 'OTU SAMPLE VALUE',
				}
			}
			//showlegend: true,
		};
		
		Plotly.newPlot('bubble', data2, layout);
	});

	d3.json(`metadata/${sample}`).then(function(sample) {
		var sample = [
			{
			type: "indicator",
			mode: "gauge+number+delta",
			value: sample.WFREQ,
			title: { text: "Belly Button Washing Frequency (per week)", font: { size: 24 } },
			text: ['0-1', 'ML4', 'ML3', 'ML2', 'ML1',  '6','7','8','9','10'],
			textinfo: 'text',
			textposition:'inside',
			//delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
			gauge: {
			axis: { range: [null, 10], tickwidth: 1, tickcolor: "black" },
			bar: { color: "#061B2F" },
			bgcolor: "white",
			borderwidth: 2,
			bordercolor: "white",
			steps: [
				{ range: [0, 1], color: "#DEEDCF" },
				{ range: [1, 2], color: "#BFE1B0" },
				{ range: [2, 3], color: "#99D492" },
				{ range: [3, 4], color: "#74C67A" },
				{ range: [4, 5], color: "#56B870" },
				{ range: [5, 6], color: "#39A96B" },
				{ range: [6, 7], color: "#1D9A6C" },
				{ range: [7, 8], color: "#188977" },
				{ range: [8, 9], color: "#137177" },
				{ range: [9, 10], color: "#0E4D64" }
			],
			// threshold: {
			//   line: { color: "red", width: 4 },
			//   thickness: 0.75,
			//   value: 490
			// }
			  }
			}
		  ];
		  
		  var layout = {
			width: 500,
			height: 400,
			margin: { t: 25, r: 25, l: 25, b: 25 },
			//paper_bgcolor: "lavender",
			font: { color: "", family: "Arial" }
		  };
		  
		  Plotly.newPlot(gauge, sample, layout);
	});
	
	// var sample = [sample.WFREQ];
	// @TODO: Build a Pie Chart
	
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
} 

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
